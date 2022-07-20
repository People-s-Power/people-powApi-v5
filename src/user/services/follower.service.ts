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

  async addFollowers() {
    const followers = await this.followerModel.find()
    return followers
  }

}
