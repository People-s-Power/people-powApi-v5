import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { organizationDocument, orgnaization } from 'src/organization/schema/organization.schema';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { Advert, AdvertDocument } from './schema/advert';
import { CreateAdvertDTO } from './schema/advert.dto';

@Injectable()
export class AdvertService {
  constructor(
    @InjectModel(Advert.name) private readonly advertModel: Model<AdvertDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(orgnaization.name) private readonly orgModel: Model<organizationDocument> 
  ){}

  async findAll(
    page?: number,
    limit?: number,
    filter?: string,
    authorId?: string
    ) {
    const adverts = await this.advertModel.find({
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
      adverts.map(async item => {
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
            likes: item.likes
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
          likes: item.likes
        }
      })
    )

    return result
  }

  async findOne(advertId) {
    const advert = await this.advertModel.findOne({
      ...(advertId && { _id: advertId })
    })
    
    if (advert.author === 'User') {
      const user = await this.userModel.findById(advert.authorId)
      return {
        ...advert._doc,
        author: {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image
        },
        shares: advert.shares.length,
        likes: advert.likes
      }
    }

    const org = await this.orgModel.findById(advert.authorId)
    return {
      ...advert._doc,
      author: {
        _id: org._id,
        name: org.name,
        email: org.email,
        image: org.image
      },
      shares: advert.shares.length,
      likes: advert.likes
    }
  }


  async create(data: CreateAdvertDTO, user){
    const image = await cloudinaryUpload(data.imageFile).catch((err) => {
      throw err;
    });

    const advert = await this.advertModel.create({
      ...data,
      image,
      authorId: user._id,
      author: 'User'
    })

    return {
      ...advert._doc,
      author: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image
      },
      shares: advert.shares.length,
      likes: advert.likes
    }

  }

  async createOrg(data: CreateAdvertDTO, authorId){
    const org = await this.orgModel.findById(authorId)
    if (!org) {
      throw new NotFoundException('Orgnaization not found')
    }
    const image = await cloudinaryUpload(data.imageFile).catch((err) => {
      throw err;
    });

    const advert = await this.advertModel.create({
      ...data,
      image,
      authorId: org._id,
      author: 'orgnaization'
    })

    return {
      ...advert._doc,
      author: {
        _id: org._id,
        name: org.name,
        email: org.email,
        image: org.image
      },
      shares: advert.shares.length,
      likes: advert.likes
    }

  }

  async update(data: CreateAdvertDTO, advertId, authorId){
    const advert = await this.advertModel.findById(advertId)
    if (advert.authorId.toString() !== authorId.toString()) {
      throw new UnauthorizedException('Your not allowed to delete')
    }

    const image = await cloudinaryUpload(data.imageFile).catch((err) => {
      throw err;
    });

    const advertItem = await this.advertModel.findOneAndUpdate(
      { _id: advertId },
      {
        ...data,
        image
      },
      { new: true },
    );

    if (advert.author === 'User') {
      const user = await this.userModel.findById(advertItem.authorId)
      return {
        ...advertItem._doc,
        author: {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image
        },
        shares: advertItem.shares.length,
        likes: advertItem.likes
      }
    }

    const org = await this.orgModel.findById(advertItem.authorId)
    return {
      ...advertItem._doc,
      author: {
        _id: org._id,
        name: org.name,
        email: org.email,
        image: org.image
      },
      shares: advertItem.shares.length,
      likes: advertItem.likes
    }

  }



}
