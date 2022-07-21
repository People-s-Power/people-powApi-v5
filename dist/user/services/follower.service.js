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
let FollowersService = class FollowersService {
    constructor(followerModel) {
        this.followerModel = followerModel;
    }
    async addFollowers(id, userId) {
        try {
            const followersModel = await this.followerModel.findOne({ userId: userId });
            const { followers } = followersModel;
            const userIsFollowing = followersModel.followers.find(item => item === id);
            console.log(followers);
            if (userIsFollowing)
                throw new common_1.BadRequestException('User already following');
            followersModel.followers.push(id);
            followersModel.followersCount++;
            const result = await followersModel.save();
            return result;
        }
        catch (error) {
            throw error;
        }
    }
};
FollowersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(followers_schema_1.Follower.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FollowersService);
exports.FollowersService = FollowersService;
//# sourceMappingURL=follower.service.js.map