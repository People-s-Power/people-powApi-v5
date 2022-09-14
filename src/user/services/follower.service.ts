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

      // Find user
      const user = await this.userModel.findById(userId)
      // Checks if it exists
      if(!user) throw new BadRequestException(`User don't exist`)
      
      
      // Check if user is already following
      const userIsFollowing =  user.followers.find(item => item === id)
      if(userIsFollowing) throw new BadRequestException('User already following')
      
      // Add the followed user to the followers following Array
      const follower = await this.userModel.findById(id)
      if(!follower) throw new BadRequestException(`User don't exist`)
      let { following } = follower
      following.push(userId)
      follower.followingCount += 1

      await follower.save()

      // Push in new follower
      const { followers } = user
      const fx = followers
      fx.push(id)

      // Save new follower
      user.followers = fx
      user.followersCount += 1
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


  async unFollow(id, userId) {
    try {
      
      // Check if user exists Allways!!!
      const user = await this.userModel.findById(userId)
      if(!user) throw new BadRequestException(`User don't exist`)

      // Unfollow the user
      let userIsFollowing =  user.followers.findIndex(item => item === id)
      const { followers } = user
      const fx = followers
      fx.splice(userIsFollowing, 1)

      user.followers = fx
      user.followersCount -= 1
      const result = await user.save()

      // Remove user from following
      const follower = await this.userModel.findById(id)
      if(!follower) throw new BadRequestException(`User don't exist`)
      let { following } = follower
      const followedUserIndex = following.findIndex(item => item === userId)
      follower.followingCount --
      follower.following.splice(followedUserIndex, 1)

      await follower.save()

      const payload = {
        userFollowed: {
          followers: user.followers,
          followersCount: user.followersCount,
          following: user.following,
          followingCount: user.followingCount
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
