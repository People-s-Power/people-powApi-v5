import { Model } from 'mongoose';
import { Follower, FollowerDocument } from '../entity/followers.schema';
export declare class FollowersService {
    private readonly followerModel;
    constructor(followerModel: Model<FollowerDocument>);
    addFollowers(id: any, userId: any): Promise<Follower & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
