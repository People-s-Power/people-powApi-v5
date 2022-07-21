import { 
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follower, FollowerDocument } from '../entity/followers.schema';
import { User, UserDocument } from '../entity/user.schema';

@Injectable()
export class FollowersService {
  constructor(
    @InjectModel(Follower.name)
    private readonly followerModel: Model<FollowerDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
    ) {}

  async addFollowers(id, userId) {
    try {
      const user = await this.userModel.findById(userId)

      if(!user) throw new BadRequestException(`User don't exist`)
      
      
      // Check if user is already following
      const userIsFollowing =  user.followers.find(item => item === id)
      // console.log(followers, 'wesdfjknknknuiiwn')
      console.log(user.followers, id)
      if(userIsFollowing) throw new BadRequestException('User already following')
      
      // Add the followed user to the followers following Array
      const follower = await this.userModel.findById(id)
      if(!follower) throw new BadRequestException(`User don't exist`)
      let { following } = follower
      following.push(userId)
      follower.followingCount ++

      await follower.save()

      // Push in new follower
      const { followers } = user
      const fx = followers
      fx.push(id)

      // Save new follower
      user.followers = fx
      user.followersCount ++
      const result = await user.save()

      const payload = {
        userFollowed: {
          followers: result.followers,
          followersCount: result.followersCount,
          following: result.following,
          followingCount: result.followingCount
        },
        userFollowing: {
          followers: follower.followers,
          followersCount: follower.followersCount,
          following: follower.following,
          followingCount: follower.followingCount
        }
      }
      return payload
    } catch (error) {
      throw error
    }
  }

}
