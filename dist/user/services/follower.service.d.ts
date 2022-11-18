import { Model } from 'mongoose';
import { FollowerDocument } from '../entity/followers.schema';
import { UserDocument } from '../entity/user.schema';
export declare class FollowersService {
    private readonly followerModel;
    private readonly userModel;
    constructor(followerModel: Model<FollowerDocument>, userModel: Model<UserDocument>);
    addFollowers(id: any, userId: any): Promise<{
        userFollowed: {
            followers: string[];
        };
        userFollowing: {
            followers: string[];
        };
    }>;
    unFollow(id: any, userId: any): Promise<string>;
}
