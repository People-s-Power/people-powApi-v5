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


  async addUpdates(campaignId, body, img) {
    const image = await cloudinaryUpload(img).catch((err) => {
      throw err;
    });
    const update = await this.UpdateModel.create({
      campaign: campaignId,
      body: body,
      image
    })

    await update.save()
    return update
  }

  async getCampUpdates(campaignId) {
    const updates = await this.UpdateModel.find({ campaign: campaignId })
    return updates
  }
}
