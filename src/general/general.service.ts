import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Advert, AdvertDocument } from 'src/advert/schema/advert';
import { EventDocument, event } from 'src/event/schema/event';
import { organizationDocument, orgnaization } from 'src/organization/schema/organization.schema';
import { Petition, PetitionDocument } from 'src/petition/schema/petition.schema';
import { PostDocument, Post} from 'src/post/schema/post.schema';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { Victory, VictoryDocument } from 'src/victory/entities/victory.entity'
@Injectable()
export class GeneralService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Advert.name) private readonly advertModel: Model<AdvertDocument>,
    @InjectModel(orgnaization.name) private readonly orgModel: Model<organizationDocument>,
    @InjectModel(event.name) private readonly eventModel: Model<EventDocument>,
    @InjectModel(Petition.name) private readonly PetitionModel: Model<PetitionDocument>,
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(Victory.name) private readonly VictoryModel: Model<VictoryDocument>,
    
  ){}

  findAll() {
    return `This action returns all general`;
  }

  async like(itemId, authorId) {
    const [
      petition,
      victory,
      advert,
      event,
      post
    ] = await Promise.all([
      this.PetitionModel.findById(itemId),
      this.VictoryModel.findById(itemId),
      this.advertModel.findById(itemId),
      this.eventModel.findById(itemId),
      this.postModel.findById(itemId)
    ])

    if (petition) {
      const liked = this.checkIfLiked(petition.likes, authorId)
      if (liked) throw new BadRequestException('Liked by user')
      petition.likes.push(authorId)
      await petition.save()
      return 'Sucess'
    }

    if (victory) {
      const liked = this.checkIfLiked(victory.likes, authorId)
      if (liked) throw new BadRequestException('Liked by user')
      victory.likes.push(authorId)
      await victory.save()
      return 'Sucess'
    }

    if (advert) {
      const liked = this.checkIfLiked(advert.likes, authorId)
      if (liked) throw new BadRequestException('Liked by user')
      advert.likes.push(authorId)
      await advert.save()
      return 'Sucess'
    }

    if (event) {
      const liked = this.checkIfLiked(event.likes, authorId)
      if (liked) throw new BadRequestException('Liked by user')
      event.likes.push(authorId)
      await event.save()
      return 'Sucess'
    }

    if (post) {
      const liked = this.checkIfLiked(post.likes, authorId)
      if (liked) throw new BadRequestException('Liked by user')
      post.likes.push(authorId)
      await post.save()
      return 'Sucess'
    }


  }

  unlike(id: number) {
    return `This action returns a #${id} general`;
  }

  checkIfLiked(list: string[], authorId): string {
    const liked = list.find(item => item.toString() === authorId.toString())
    return liked
  }


  remove(id: number) {
    return `This action removes a #${id} general`;
  }
}
