import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { orgnaization, organizationDocument } from 'src/organization/schema/organization.schema';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { Victory, VictoryDocument } from './entities/victory.entity';

@Injectable()
export class VictoryService {
  constructor(
    @InjectModel(Victory.name) private readonly VictoryModel: Model<VictoryDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(orgnaization.name) private readonly orgModel: Model<organizationDocument> 
  ){}

  async create(body: string, authorId: string) {
    const user = await this.userModel.findById(authorId)
    const org = await this.orgModel.findById(authorId)

    let author: any = user
    let authorEnum = 'User'
    if (!user) {
      author = org
      authorEnum = 'orgnaization'
    }
console.log(author?.name)
    const victory = await this.VictoryModel.create({
      body,
      authorId,
      author: authorEnum
    })

    return {
      ...victory._doc,
      author,
      shares: victory.shares.length,
      likes: victory.likes.length
    }
  }

  async findAll(
    page?: number,
    limit?: number,
    filter?: string,
    authorId?: string
    ) {
    const victories = await this.VictoryModel.find({
      ...(filter && {
        $or: [{ name: filter }, { description: filter }, { audience: filter }],
      }),
      ...(authorId && { authorId: authorId }),
    })
    .sort("-createdAt")
      .limit(limit)
      .skip(limit * (page - 1))
      .catch(e => { throw e; });


    const result = await Promise.all(
      victories.map(async item => {
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

  async findOne(victoryId) {
    const victory = await this.VictoryModel.findOne({
      ...(victoryId && { _id: victoryId })
    })
    
    if (victory.author === 'User') {
      const user = await this.userModel.findById(victory.authorId)
      return {
        ...victory._doc,
        author: {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image
        },
        shares: victory.shares.length,
        likes: victory.likes.length
      }
    }

    const org = await this.orgModel.findById(victory.authorId)
    return {
      ...victory._doc,
      author: {
        _id: org._id,
        name: org.name,
        email: org.email,
        image: org.image
      },
      shares: victory.shares.length,
      likes: victory.likes.length
    }
  }

  // update(id: number, updateVictoryInput: UpdateVictoryInput) {
  //   return `This action updates a #${id} victory`;
  // }

  remove(id: number) {
    return `This action removes a #${id} victory`;
  }
}
