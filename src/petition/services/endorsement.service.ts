import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/entity/user.schema';
import {
  CreateEndorsementDTO,
  LikeEndorsementDTO,
  UpdateEndorsementDTO,
} from '../dto/endorsement.dto';
import { PetitionGateway } from '../gateway/petition.gateway';
import { Petition, PetitionDocument } from '../schema/petition.schema';
import { Endorsement, EndorsementDocument } from '../schema/endorsement.schema';
import { ClientProxy } from '@nestjs/microservices';
// import { endorsedCampMail } from '../../utils/sendMaijet'

@Injectable()
export class EndorsementService {
  constructor(
    @Inject('MAIL_SERVICE') private client: ClientProxy,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Endorsement.name)
    private readonly endorsementModel: Model<EndorsementDocument>,
    @InjectModel(Petition.name)
    private readonly petitionModel: Model<PetitionDocument>,
    private petitionGateway: PetitionGateway,
  ) {}

  async create(
    data: CreateEndorsementDTO,
    user: UserDocument,
  ): Promise<Endorsement> {
    const { petition, body } = data;

    try {
      let petition1 = await this.petitionModel.findById(petition);
      const endorsers = petition1.endorserIds
      const endorser = endorsers.find((item) => item.toString() === user.id.toString())
      
      if(endorser) throw new Error('User already Endorsed')

      // console

       petition1 = await this.petitionModel.findOneAndUpdate(
        { _id: petition },
        { $addToSet: { endorserIds: user.id } },
        { new: true },
      );

      // const campEndorsementsCount = await this.endorsementModel.find({ petition: petition }).count()

      // const numberOfPaidEndorsementCount = petition1.numberOfPaidEndorsementCount
      //   if(numberOfPaidEndorsementCount <= campEndorsementsCount) {
      //     throw new BadRequestException(`Can't endorse petition right now`)
      //   }

      const endorsement = await this.endorsementModel.create({
        petition,
        body,
        author: user.id as any,
      });

      petition1 = await this.petitionModel.findOneAndUpdate(
        { _id: petition },
        { $addToSet: { endorsements: endorsement } },
        { new: true },
      );

      // Notify that an endorsement was created
      await this.petitionGateway.endorsedPetition({
        petitionTitle: petition1.title,
        user,
      });

      // Send an Email to owner of the petition
      const author = await this.userModel.findById(petition1.authorId)
      const endorserName = user.name

      const mailPayload = {
        author,
        endorserName,
        petition: petition1
      }
      this.client.emit('petition-endorsed', mailPayload)
      // await endorsedCampMail(petition1.title, petition1.endorsements.length, author.email, author.name)
      return endorsement;
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<Endorsement[]> {
    try {
      const endorsements = await this.endorsementModel
        .find()
        .populate('author', 'id firstName lastName');

      return endorsements;
    } catch (error) {
      throw error;
    }
  }
  async findBypetition(petition: any): Promise<Endorsement[]> {
    try {
      const endorsements = await this.endorsementModel
        .find({ petition })
        .populate('author', 'id firstName lastName image');
      return endorsements;
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<Endorsement> {
    try {
      const endorsements = await this.endorsementModel
        .findById(id)
        .populate('author', 'id firstName lastName');
      return endorsements;
    } catch (error) {
      throw error;
    }
  }
  async update(data: UpdateEndorsementDTO): Promise<Endorsement> {
    try {
      const endorsement = await this.endorsementModel.findByIdAndUpdate(
        data.id,
        data,
        { new: true },
      );
      return endorsement;
    } catch (error) {
      throw error;
    }
  }
  async like(data: LikeEndorsementDTO, user: UserDocument): Promise<boolean> {
    let endorsement = await this.endorsementModel.findById(data.id);

    if (endorsement?.likes?.includes(user.id)) {
      return await this.unLike(data, user);
    } else
      try {
        endorsement = await this.endorsementModel.findByIdAndUpdate(
          data.id,
          { $addToSet: { likes: user?.id } },
          { new: true },
        );
        return true;
      } catch (error) {
        throw error;
      }
  }
  async unLike(data: LikeEndorsementDTO, user: UserDocument): Promise<boolean> {
    try {
      await this.endorsementModel.findByIdAndUpdate(
        data.id,
        { $pull: { likes: user?.id } },
        { new: true },
      );
      return false;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<Endorsement> {
    try {
      const endorsement = await this.endorsementModel.findById(id);
      if (!id) throw new NotFoundException('No Record found');
      await this.petitionModel.updateOne(
        { _id: endorsement.petiton },
        { $pull: { endorsements: id } },
      );
      endorsement.remove();
      return endorsement;
    } catch (error) {
      throw error;
    }
  }
  async deleteMany(): Promise<number> {
    try {
      const res = await this.endorsementModel.deleteMany();
      return res.deletedCount;
    } catch (error) {
      throw error;
    }
  }
}
