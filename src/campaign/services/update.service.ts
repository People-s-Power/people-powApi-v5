import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Update, UpdateDocument } from '../schema/update.schema';

@Injectable()
export class UpdateService {
  constructor(
    @InjectModel(Update.name)
    private readonly UpdateModel: Model<UpdateDocument>
  ){}


  async addUpdates(campaignId, body) {
    const update = await this.UpdateModel.create({
      campaign: campaignId,
      body: body
    })

    return update
  }

  async getCampUpdates(campaignId) {
    const updates = await this.UpdateModel.find({ campaign: campaignId })
    return updates
  }
}
