import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    ]).catch((e) => {
      throw new Error(`Can't find activity`);
    });

    if (petition) {
      const liked = this.checkIfLiked(petition.likes, authorId, itemId)
      if (liked) return liked
      petition.likes.push(authorId)
      await petition.save()
      return 'Sucess'
    }

    if (victory) {
      const liked = this.checkIfLiked(victory.likes, authorId, itemId)
      if (liked) return liked
      victory.likes.push(authorId)
      await victory.save()
      return 'Sucess'
    }

    if (advert) {
      const liked = this.checkIfLiked(advert.likes, authorId, itemId)
      if (liked) return liked
      advert.likes.push(authorId)
      await advert.save()
      return 'Sucess'
    }

    if (event) {
      const liked = this.checkIfLiked(event.likes, authorId, itemId)
      if (liked) return liked
      event.likes.push(authorId)
      await event.save()
      return 'Sucess'
    }

    if (post) {
      const liked = this.checkIfLiked(post.likes, authorId, itemId)
      if (liked) return liked
      post.likes.push(authorId)
      await post.save()
      return 'Sucess'
    }

    return 'Failed'


  }

  async unlike(itemId, authorId) {
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
    ]).catch((e) => {
      throw new Error(`Can't find activity`);
    });

    console.log('Unliked')
    if (petition) {
      const updatedLikes = this.updateLikes(petition.likes, authorId)
      petition.likes = updatedLikes
      await petition.save()
      return 'Unliked!!'
    }

    if (victory) {
      const updatedLikes = this.updateLikes(victory.likes, authorId)
      victory.likes = updatedLikes
      await victory.save()
      return 'Unliked!!'
    }

    if (advert) {
      const updatedLikes = this.updateLikes(advert.likes, authorId)
      advert.likes = updatedLikes
      await advert.save()
      return 'Unliked!!'
    }

    if (event) {
      const updatedLikes = this.updateLikes(event.likes, authorId)
      event.likes = updatedLikes
      await event.save()
      return 'Unliked!!'
    }

    if (post) {
      const updatedLikes = this.updateLikes(post.likes, authorId)
      post.likes = updatedLikes
      await post.save()
      return 'Unliked!!'
    }

    return 'Failed!'
  }

  checkIfLiked(list: string[], authorId, itemId): string {
    const liked = list.find(item => item.toString() === authorId.toString())
    if (liked) {
      this.unlike(itemId, authorId)
    }
    return liked
  }
  updateLikes(list: string[], authorId: string): string[] {
    const unliked = list.filter(item => item.toString() !== authorId.toString())
    return unliked
  }


  async addFollowers(id, userId) {
    try {

      // Find user
      // const user = await this.userModel.findById(userId)
      const [user, org] = await Promise.all([
        this.userModel.findById(userId),
        this.orgModel.findById(userId)
      ]).catch(e => {
        throw new NotFoundException('User or org not found')
      }) 

      if (user) {
        
        // Check if user is already following
        const res = user.followers.find(item => item.toString() === id.toString())
        if(res) throw new BadRequestException('User already following')
        
        // Add the followed user to the followers following Array
        const [userFollower, orgFollower] = await Promise.all([
          this.userModel.findById(id),
          this.orgModel.findById(id)
        ]).catch(e => {
          throw new NotFoundException('User or org not found')
        }) 

        if (userFollower) {
          let { following } = userFollower
          following.push(userId)
          await userFollower.save()
        }

        if (orgFollower) {
          let { following } = orgFollower
          following.push(userId)
          await orgFollower.save()
        }
  
        // Push in new follower
        const { followers } = user
        const fx = followers
        fx.push(id)
  
        // Save new follower
        user.followers = fx
        await user.save()
      
        return 'Followed'
      }

      if (org) {
        
        // Check if user is already following
        const res = org.followers.find(item => item.toString() === id.toString())
        if(res) throw new BadRequestException('User already following')
        
        // Add the followed user to the followers following Array
        const [userFollower, orgFollower] = await Promise.all([
          this.userModel.findById(id),
          this.orgModel.findById(id)
        ]).catch(e => {
          throw new NotFoundException('User or org not found')
        }) 
        
        if (userFollower) {
          let { following } = userFollower
          following.push(userId)
          await userFollower.save()
        }

        if (orgFollower) {
          let { following } = orgFollower
          following.push(userId)
          await orgFollower.save()
        }
  
        // Push in new follower
        const { followers } = org
        const fx = followers
        fx.push(id)
  
        // Save new follower
        org.followers = fx
        await org.save()
      
        return 'Followed'
      }
      return 'Failed'
    } catch (error) {
      throw error
    }
  }


  async unFollow(id, userId) {
    try {
      
      // Check if user exists Allways!!!
      const [user, org] = await Promise.all([
        this.userModel.findById(userId),
        this.orgModel.findById(userId)
      ]).catch(e => {
        throw new NotFoundException('User or org not found')
      })

      // Unfollow the user
      const userIsFollowing =  user.followers.filter(item => item !== id)
      user.followers = userIsFollowing
      await user.save()

      // Remove user from following
      const unFollowedUser = await this.userModel.findById(id)
      const followers = unFollowedUser.following.filter(item => item !== userId)
      unFollowedUser.following = followers

      await unFollowedUser.save() 

      return 'payload'
    } catch (error) {
      throw error
    }

  }


  async timeLine(authorId) {
    const [user, org] = await Promise.all([
      this.userModel.findById(authorId),
      this.orgModel.findById(authorId)
    ]).catch(e => {
      throw new NotFoundException('User or org not found')
    }) 
  }

}
