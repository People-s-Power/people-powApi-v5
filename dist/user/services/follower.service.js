"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const followers_schema_1 = require("../entity/followers.schema");
const user_schema_1 = require("../entity/user.schema");
let FollowersService = class FollowersService {
    constructor(followerModel, userModel) {
        this.followerModel = followerModel;
        this.userModel = userModel;
    }
    async addFollowers(id, userId) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user)
                throw new common_1.BadRequestException(`User don't exist`);
            const userIsFollowing = user.followers.find(item => item === id);
            console.log(user.followers, id);
            if (userIsFollowing)
                throw new common_1.BadRequestException('User already following');
            const follower = await this.userModel.findById(id);
            if (!follower)
                throw new common_1.BadRequestException(`User don't exist`);
            let { following } = follower;
            following.push(userId);
            follower.followingCount++;
            await follower.save();
            const { followers } = user;
            const fx = followers;
            fx.push(id);
            user.followers = fx;
            user.followersCount++;
            const result = await user.save();
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
            };
            return payload;
        }
        catch (error) {
            throw error;
        }
    }
};
FollowersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(followers_schema_1.Follower.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], FollowersService);
exports.FollowersService = FollowersService;
//# sourceMappingURL=follower.service.js.map