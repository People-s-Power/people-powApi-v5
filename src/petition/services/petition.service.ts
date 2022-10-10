import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  Logger
} from '@nestjs/common';
import { InjectConnection, InjectModel, Schema } from '@nestjs/mongoose';
import { Connection, Model, ObjectId } from 'mongoose';
import { IGeo } from 'src/interfaces';
import { Notice, NoticeDocument } from 'src/notification/notification.schema';
import { ISession } from 'src/typings';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { CreatePetitionDTO, CreatePetitionOrgDTO, UpdatePetitionDTO } from '../dto/petition.dto';
import { PetitionStatusEnum } from '../dto/petition.interface';
import { PetitionGateway } from '../gateway/petition.gateway';
import { Petition, PetitionDocument, View, ViewDocument } from '../schema/petition.schema';
import { Endorsement } from '../schema/endorsement.schema';
import { ClientProxy } from '@nestjs/microservices';
import { UserController } from 'src/user/controllers/user.controller';
// import { viewCampMail, updateCampMail } from  '../../utils/sendMaijet'

export class ISessionResponseData {
  id: any;
  user: string;
  location: IGeo;
}
@Injectable()
export class PetitionService {
  logger: Logger;
  constructor(
    @Inject('MAIL_SERVICE') private client: ClientProxy,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(View.name)
    private viewModel: Model<ViewDocument>,
    @InjectModel(Petition.name)
    private readonly PetitionModel: Model<PetitionDocument>,
    @InjectModel(Endorsement.name)
    private readonly endorsementModel: Model<Endorsement>,
    @InjectModel(Notice.name)
    private readonly noticeModel: Model<NoticeDocument>,
    private PetitionGateway: PetitionGateway,
    @InjectConnection() private connection: Connection,
  ) {
    this.logger = new Logger()
  }


  async create(data: CreatePetitionDTO, user: UserDocument): Promise<Petition> {

    const image = await cloudinaryUpload(data.image).catch((err) => {
      throw err;
    });
    const { body } = data;
    let excerpt: string;
    if (body) {
      excerpt = body.split(' ').splice(0, 36).join(' ');
    }

    try {
      const Petition = await this.PetitionModel.create({
        ...data,
        authorId: user.id,
        authorName: user.name,
        authorImg: user.image || 'No img',
        excerpt,
        image,
        slug: data.title.split(" ").join("-"),
        numberOfPaidEndorsementCount: 0,
        numberOfPaidViewsCount: 0,
        region: user.country,

      });
      this.PetitionGateway.createdPetition({
        PetitionTitle: Petition.title,
        user,
      });


      // Get all users 
    const users = await this.userModel.find()
    // Extract email and user name
    const usersEmails = users.map(user => {
     return {email: user.email, username: user.firstName}
    })

    // Get all Petitions to display 
    const allPetitions = await this.PetitionModel.find()

    // Payload to be sent
    const mailPayload = {
      users: usersEmails,
      Petition: Petition,
      Petitions: allPetitions
    }
    // proxy function
    this.client.emit('Petition-created', mailPayload)

      
      return Petition;
    } catch (error) {
      throw error;
    }
  }

  async createForOrg(data: CreatePetitionOrgDTO): Promise<Petition> {

    this.logger.log(data)

    const image = await cloudinaryUpload(data.image).catch((err) => {
      throw err;
    });
    const { body } = data;
    let excerpt: string;
    if (body) {
      excerpt = body.split(' ').splice(0, 36).join(' ');
    }

    try {
      const Petition = await this.PetitionModel.create({
        ...data,
        excerpt,
        image,
        slug: data.title.split(" ").join("-"),
        numberOfPaidEndorsementCount: 0,
        numberOfPaidViewsCount: 0,
        region: data.country,

      });
      this.PetitionGateway.createdPetitionOrg({
        PetitionTitle: Petition.title,
        orgName: data.authorName,
        orgId: data.authorId
      });


      // Get all users 
    const users = await this.userModel.find()
    // Extract email and user name
    const usersEmails = users.map(user => {
     return {email: user.email, username: user.firstName}
    })

    // Get all Petitions to display 
    const allPetitions = await this.PetitionModel.find()

    // Payload to be sent
    const mailPayload = {
      users: usersEmails,
      Petition: Petition,
      Petitions: allPetitions
    }
    // proxy function
    this.client.emit('Petition-created', mailPayload)

      
      return Petition;
    } catch (error) {
      throw error;
    }
  }

  async findAll(region?: string, limit?: number, ): Promise<Petition[]> {
    try {
      const Petitions = await this.PetitionModel
        .find({ region: region })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('endorsements', 'id')
        .populate('views');

      return Petitions as unknown as Promise<PetitionDocument[]>;
    } catch (error) {
      throw error;
    }
  }

  async findAllOtherRegions(limit?: number, ): Promise<Petition[]> {
    try {
      const Petitions = await this.PetitionModel
        .find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('endorsements', 'id')
        .populate('views');

      return Petitions as unknown as Promise<PetitionDocument[]>;
    } catch (error) {
      throw error;
    }
  }

  async findAllActive(region: string, limit?: number): Promise<Petition[]> {
    try {
      const Petitions = await this.PetitionModel
        .find({ status: PetitionStatusEnum.Active })
        .sort({ createdAt: -1 })
        .populate('endorsements', 'id');
      
      const regionCampains = Petitions.filter(camp => camp.region === region)
      return regionCampains as unknown as Promise<PetitionDocument[]>;
    } catch (error) {
      throw error;
    }
  }

  async findAllActiveOtherRegions(region: string, limit?: number): Promise<Petition[]> {
    try {
      const Petitions = await this.PetitionModel
        .find({ status: PetitionStatusEnum.Active })
        .sort({ createdAt: -1 })
        .populate('endorsements', 'id');

      return Petitions as unknown as Promise<PetitionDocument[]>;
    } catch (error) {
      throw error;
    }
  }

  async findOne(slug: string): Promise<PetitionDocument> {
    try {
      const Petitions = await this.PetitionModel
        .findOne({ slug })
        .populate('endorsements');

      return Petitions;
    } catch (error) {
      throw error;
    }
  }

  async update(data: Partial<UpdatePetitionDTO>): Promise<Petition> {
    try {
      const Petition = await this.PetitionModel.findOneAndUpdate(
        { _id: data.id },
        data,
        { new: true },
      );
      // const author = await this.userModel.findById(Petition.authorId)git 

      // await updateCampMail(Petition.title, author.email, author.name)
      return Petition;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<PetitionDocument> {
    try {
      const Petition = await this.PetitionModel.findById(id);
      if (!Petition) throw new NotFoundException('Record not found');
      await this.endorsementModel.deleteMany({ Petition: id as any });
      Petition.remove();
      return Petition;
    } catch (error) {
      throw error;
    }
  }

  async updateSession(
    id: string,
    sessionID: string,
  ): Promise<PetitionDocument> {
    try {
      let Petition = await this.PetitionModel.findById(id);
      const session = await this.session(sessionID);
      if (!Petition) throw new NotFoundException();
      let view = await this.connection.models.View.findOne({
        sessionId: session.id,
      });

      if (!view) {
        view = await this.connection.models.View.create({
          sessionId: session.id,
          country: session.location.country_name,
          user: session?.user,
        });
      } else {
        if (!Petition.views.some((v) => v.sessionId === session.id)) {
          Petition = await this.PetitionModel.findByIdAndUpdate(
            id,
            {
              $addToSet: {
                views: view.id,
              },
            },
            { new: true },
          );
        }
      }

      return Petition;
    } catch (error) {
      throw error;
    }
  }

  async like(
    Petition_id: string,
    user: UserDocument,
  ): Promise<PetitionDocument> {
    const Petition = await this.PetitionModel.findById(Petition_id);

    if (Petition?.likes?.includes(user.id)) {
      return await this.unLike(Petition_id, user);
    } else {
      try {
        const Petition = await this.PetitionModel.findOneAndUpdate(
          { _id: Petition_id },
          { $addToSet: { likes: user?.id } },
          { new: true },
        );

        return Petition;
      } catch (error) {
        throw error;
      }
    }
  }
  async unLike(
    Petition_id: string,
    user: UserDocument,
  ): Promise<PetitionDocument> {
    try {
      const Petition = await this.PetitionModel.findOneAndUpdate(
        { _id: Petition_id },
        { $pull: { likes: user?.id } },
        { new: true },
      );
      return Petition;
    } catch (error) {
      throw error;
    }
  }
  async myPetitions(user_id: string): Promise<Petition[]> {
    try {
      const Petitions = await this.PetitionModel
        .find({
          authorId: user_id as any,
        })
        .sort({ createdAt: -1 });

      return Petitions;
    } catch (error) {
      throw error;
    }
  }
  async approvePetition(Petition_id: string): Promise<PetitionDocument> {
    let Petition = await this.PetitionModel.findById(Petition_id);
    try {
      Petition = await this.PetitionModel.findOneAndUpdate(
        { _id: Petition_id },
        {
          $set: {
            status:
              Petition.status === PetitionStatusEnum.Active
                ? PetitionStatusEnum.Pending
                : PetitionStatusEnum.Active,
          },
        },
        { new: true },
      );
      return Petition;
    } catch (error) {
      throw error;
    }
  }

  async viewPetition(
    id: string,
    userId: string,
  ): Promise<PetitionDocument | string> {
    try {
      const Petition = await this.PetitionModel.findById(id);
      const user = await this.userModel.findById(userId)
      if(!Petition || !user) throw new Error('Not found')

      if(Petition.authorId.toString() === userId.toString())
        return 'Author Viewed'

      if(Petition.views.includes(userId)) return 'Viewed'

      // Sending email to the author 
      const author = await this.userModel.findById(Petition.authorId)
      // const numberOfViews = Petition.views.length

      // const numberOfPaidViews = Petition.numberOfPaidViewsCount

      // if(numberOfPaidViews <= numberOfViews) {
      //   return 'Viewer Added';
      // }


      Petition.views.push(userId)
      await Petition.save()
      // console.log(Petition)
      // await viewCampMail(Petition.title, user?.name, author.email, author.name)
      return Petition
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
  async findAllNotice(model?: string) {
    try {
      if (model) {
        const notifications = await this.noticeModel
          .find({
            db_model: model,
          })
          .populate({
            path: 'user',
            select: 'id image firstName lastName',
          })
          .sort({ createdAt: -1 });

        return notifications;
      } else {
        const notifications = await this.noticeModel
          .find({})
          .populate({
            path: 'user',
            select: 'id image firstName lastName',
          })
          .sort({ createdAt: -1 });

        return notifications;
      }
    } catch (error) {
      throw error;
    }
  }
  async feature(Petition_id: ObjectId): Promise<PetitionDocument> {
    let Petition = await this.PetitionModel.findById(Petition_id);
    try {
      Petition = await this.PetitionModel.findOneAndUpdate(
        { _id: Petition_id },
        { $set: { featured: !Petition.featured } },
      );
      return Petition;
    } catch (error) {
      throw error;
    }
  }
  async session(_id: string): Promise<ISessionResponseData> {
    try {
      const data = await this.connection.db
        .collection('sessions')
        .findOne({ _id });
      if (!data) throw new NotFoundException();
      const result: ISession = JSON.parse(data.session);

      return {
        id: data._id,
        user: result.passport.user.id,
        location: result.location,
      };
    } catch (error) {
      throw error;
    }
  }
}
