import { ReqWithUser } from 'src/typings';
import { FollowersService } from '../services/follower.service';
export declare class FollowerController {
    private readonly followerService;
    constructor(followerService: FollowersService);
    follow(body: any, req: ReqWithUser): Promise<{
        userFollowed: {
            followers: string[];
            followersCount: number;
            following: string[];
            followingCount: number;
        };
        userFollowing: {
            followers: string[];
            followersCount: number;
            following: string[];
            followingCount: number;
        };
    }>;
    unfollow(body: any, req: ReqWithUser): Promise<{
        userFollowed: {
            followers: string[];
            followersCount: number;
            following: string[];
            followingCount: number;
        };
        userFollowing: {
            followers: string[];
            followersCount: number;
            following: string[];
            followingCount: number;
        };
    }>;
}
