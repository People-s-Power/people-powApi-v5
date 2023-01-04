import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { Petition, PetitionDocument } from '../schema/petition.schema';
import { Update, UpdateDocument } from '../schema/update.schema';

@Injectable()
export class UpdateService {
  constructor(
    @InjectModel(Update.name)
    private readonly UpdateModel: Model<UpdateDocument>,
    @InjectModel(Petition.name) private readonly PetitionModel: Model<PetitionDocument>,
  ){}


  async addUpdates(petitionId, body, img, authorIdRq) {
    const petition = await this.PetitionModel.findById(petitionId)
    console.log(petition)
    const { authorId } = petition
    if (authorId.toString() !== authorIdRq ) throw new UnauthorizedException(`Can't send an update to this petition`)
    const image = await cloudinaryUpload(img).catch((err) => {
      throw err;
    });
    const update = await this.UpdateModel.create({
      petition: petitionId,
      body: body,
      image,
      authorId: authorIdRq
    })

    await update.save()
    return update
  }

  async getPetitionUpdates(petitionId) {
    const updates = await this.UpdateModel.find({ petition: petitionId })
    return updates
  }
}
