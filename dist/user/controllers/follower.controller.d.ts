import { ReqWithUser } from 'src/typings';
import { FollowersService } from '../services/follower.service';
export declare class FollowerController {
    private readonly followerService;
    constructor(followerService: FollowersService);
    follow(body: any, req: ReqWithUser): Promise<{
        userFollowed: {
            followers: string[];
        };
        userFollowing: {
            followers: string[];
        };
    }>;
    unfollow(body: any, req: ReqWithUser): Promise<string>;
}
