import { 
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follower, FollowerDocument } from '../entity/followers.schema';

@Injectable()
export class FollowersService {
  constructor(
    @InjectModel(Follower.name)
    private readonly followerModel: Model<FollowerDocument>) {}

  async addFollowers(id, userId) {
    try {
      const followersModel = await this.followerModel.findOne({ userId: userId })
      
      // Check if user is already following
      const { followers } = followersModel
      const userIsFollowing =  followersModel.followers.find(item => item === id)
      console.log(followers)
      if(userIsFollowing) throw new BadRequestException('User already following')
      
      followersModel.followers.push(id)
      followersModel.followersCount ++
      const result = await followersModel.save()
      return result
    } catch (error) {
      throw error
    }
  }

}
