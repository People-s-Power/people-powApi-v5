import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { Update, UpdateDocument } from '../schema/update.schema';

@Injectable()
export class UpdateService {
  constructor(
    @InjectModel(Update.name)
    private readonly UpdateModel: Model<UpdateDocument>
  ){}


  async addUpdates(petitionId, body, img) {
    const image = await cloudinaryUpload(img).catch((err) => {
      throw err;
    });
    const update = await this.UpdateModel.create({
      petition: petitionId,
      body: body,
      image
    })

    await update.save()
    return update
  }

  async getPetitionUpdates(petitionId) {
    const updates = await this.UpdateModel.find({ petition: petitionId })
    return updates
  }
}
