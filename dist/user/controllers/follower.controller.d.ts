import { FollowersService } from '../services/follower.service';
export declare class FollowerController {
    private readonly followerService;
    constructor(followerService: FollowersService);
    follow(): Promise<(import("../entity/followers.schema").Follower & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
}
