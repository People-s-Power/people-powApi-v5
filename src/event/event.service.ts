import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { organizationDocument, orgnaization } from 'src/organization/schema/organization.schema';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { event, EventDocument } from './schema/event';
import { EventInput } from './schema/event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(event.name) private readonly eventModel: Model<EventDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(orgnaization.name) private readonly orgModel: Model<organizationDocument> 
  ){}


  async findAll(
    page?: number,
    limit?: number,
    filter?: string) {
    const events = await this.eventModel.find({
      ...(filter && {
        $or: [{ name: filter }, { description: filter }, { audience: filter }],
      })
    })
    .sort("-createdAt")
      .limit(limit)
      .skip(limit * (page - 1))
      .catch(e => { throw e; });


    const result = await Promise.all(
      events.map(async item => {
        if (item.author === 'User') {
          const user = await this.userModel.findById(item.authorId)
          return {
            ...item._doc,
            author: {
              _id: user._id,
              name: user.name,
              email: user.email,
              image: user.image
            },
            shares: item.shares.length,
            likes: item.likes.length
          }
        }
        const org = await this.orgModel.findById(item.authorId)
        return {
          ...item._doc,
          author: {
            _id: org._id,
            name: org.name,
            email: org.email,
            image: org.image
          },
          shares: item.shares.length,
          likes: item.likes.length
        }
      })
    )

    return result
  }




  async create(data: EventInput, user){
    const image = await cloudinaryUpload(data.imageFile).catch((err) => {
      throw err;
    });

    const event = await this.eventModel.create({
      ...data,
      image,
      authorId: user._id,
      author: 'User'
    })

    return {
      ...event._doc,
      author: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image
      },
      shares: event.shares.length,
      likes: event.likes.length
    }

  }

  async createOrg(data: EventInput, authorId){
    const org = await this.orgModel.findById(authorId)
    if (!org) {
      throw new NotFoundException('Orgnaization not found')
    }
    const image = await cloudinaryUpload(data.imageFile).catch((err) => {
      throw err;
    });

    const event = await this.eventModel.create({
      ...data,
      image,
      authorId: org._id,
      author: 'orgnaization'
    })

    return {
      ...event._doc,
      author: {
        _id: org._id,
        name: org.name,
        email: org.email,
        image: org.image
      },
      shares: event.shares.length,
      likes: event.likes.length
    }

  }

  async update(data: EventInput, eventId, authorId){
    const event = await this.eventModel.findById(eventId)
    if (event.authorId.toString() !== authorId.toString()) {
      throw new UnauthorizedException('Your not allowed to delete')
    }

    const image = await cloudinaryUpload(data.imageFile).catch((err) => {
      throw err;
    });

    const eventItem = await this.eventModel.findOneAndUpdate(
      { _id: eventId },
      {
        ...data,
        image
      },
      { new: true },
    );

    if (event.author === 'User') {
      const user = await this.userModel.findById(eventItem.authorId)
      return {
        ...eventItem._doc,
        author: {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image
        },
        shares: eventItem.shares.length,
        likes: eventItem.likes.length
      }
    }

    const org = await this.orgModel.findById(eventItem.authorId)
        return {
          ...eventItem._doc,
          author: {
            _id: org._id,
            name: org.name,
            email: org.email,
            image: org.image
          },
          shares: eventItem.shares.length,
          likes: eventItem.likes.length
        }

  }


  async remove(eventId, authorId) {
    const event = await this.eventModel.findById(eventId)
    if (event.authorId.toString() !== authorId.toString()) {
      throw new UnauthorizedException('Your not allowed to delete')
    }

    const item = await this.eventModel.findByIdAndDelete(eventId)
    return item
  }


}
