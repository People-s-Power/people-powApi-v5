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
exports.GeneralService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const advert_1 = require("../advert/schema/advert");
const event_1 = require("../event/schema/event");
const organization_schema_1 = require("../organization/schema/organization.schema");
const petition_schema_1 = require("../petition/schema/petition.schema");
const update_schema_1 = require("../petition/schema/update.schema");
const post_schema_1 = require("../post/schema/post.schema");
const user_schema_1 = require("../user/entity/user.schema");
const victory_entity_1 = require("../victory/entities/victory.entity");
let GeneralService = class GeneralService {
    constructor(userModel, UpdateModel, advertModel, orgModel, eventModel, PetitionModel, postModel, VictoryModel) {
        this.userModel = userModel;
        this.UpdateModel = UpdateModel;
        this.advertModel = advertModel;
        this.orgModel = orgModel;
        this.eventModel = eventModel;
        this.PetitionModel = PetitionModel;
        this.postModel = postModel;
        this.VictoryModel = VictoryModel;
    }
    findAll() {
        return `This action returns all general`;
    }
    async like(itemId, authorId) {
        const [petition, victory, advert, event, post, update] = await Promise.all([
            this.PetitionModel.findById(itemId),
            this.VictoryModel.findById(itemId),
            this.advertModel.findById(itemId),
            this.eventModel.findById(itemId),
            this.postModel.findById(itemId),
            this.UpdateModel.findById(itemId)
        ]).catch((e) => {
            throw new Error(`Can't find activity`);
        });
        if (petition) {
            const liked = this.checkIfLiked(petition.likes, authorId, itemId);
            if (liked)
                return liked;
            petition.likes.push(authorId);
            await petition.save();
            return 'Sucess';
        }
        if (victory) {
            const liked = this.checkIfLiked(victory.likes, authorId, itemId);
            if (liked)
                return liked;
            victory.likes.push(authorId);
            await victory.save();
            return 'Sucess';
        }
        if (advert) {
            const liked = this.checkIfLiked(advert.likes, authorId, itemId);
            if (liked)
                return liked;
            advert.likes.push(authorId);
            await advert.save();
            return 'Sucess';
        }
        if (event) {
            const liked = this.checkIfLiked(event.likes, authorId, itemId);
            if (liked)
                return liked;
            event.likes.push(authorId);
            await event.save();
            return 'Sucess';
        }
        if (post) {
            const liked = this.checkIfLiked(post.likes, authorId, itemId);
            if (liked)
                return liked;
            post.likes.push(authorId);
            await post.save();
            return 'Sucess';
        }
        if (update) {
            const liked = this.checkIfLiked(update.likes, authorId, itemId);
            if (liked)
                return liked;
            update.likes.push(authorId);
            await update.save();
            return 'Sucess';
        }
        return 'Failed';
    }
    async unlike(itemId, authorId) {
        const [petition, victory, advert, event, post, update] = await Promise.all([
            this.PetitionModel.findById(itemId),
            this.VictoryModel.findById(itemId),
            this.advertModel.findById(itemId),
            this.eventModel.findById(itemId),
            this.postModel.findById(itemId),
            this.UpdateModel.findById(itemId)
        ]).catch((e) => {
            throw new Error(`Can't find activity`);
        });
        console.log('Unliked');
        if (petition) {
            const updatedLikes = this.updateLikes(petition.likes, authorId);
            petition.likes = updatedLikes;
            await petition.save();
            return 'Unliked!!';
        }
        if (victory) {
            const updatedLikes = this.updateLikes(victory.likes, authorId);
            victory.likes = updatedLikes;
            await victory.save();
            return 'Unliked!!';
        }
        if (advert) {
            const updatedLikes = this.updateLikes(advert.likes, authorId);
            advert.likes = updatedLikes;
            await advert.save();
            return 'Unliked!!';
        }
        if (event) {
            const updatedLikes = this.updateLikes(event.likes, authorId);
            event.likes = updatedLikes;
            await event.save();
            return 'Unliked!!';
        }
        if (post) {
            const updatedLikes = this.updateLikes(post.likes, authorId);
            post.likes = updatedLikes;
            await post.save();
            return 'Unliked!!';
        }
        if (update) {
            const liked = this.updateLikes(update.likes, authorId);
            if (liked)
                return liked;
            update.likes.push(authorId);
            await update.save();
            return 'Sucess';
        }
        return 'Failed!';
    }
    checkIfLiked(list, authorId, itemId) {
        const liked = list.find(item => item.toString() === authorId.toString());
        if (liked) {
            this.unlike(itemId, authorId);
        }
        return liked;
    }
    updateLikes(list, authorId) {
        const unliked = list.filter(item => item.toString() !== authorId.toString());
        return unliked;
    }
    async addFollowers(id, userId) {
        try {
            const [user, org] = await Promise.all([
                this.userModel.findById(userId),
                this.orgModel.findById(userId)
            ]).catch(e => {
                throw new common_1.NotFoundException('User or org not found');
            });
            if (user) {
                const res = user.followers.find(item => item.toString() === id.toString());
                if (res)
                    throw new common_1.BadRequestException('User already following');
                const [userFollower, orgFollower] = await Promise.all([
                    this.userModel.findById(id),
                    this.orgModel.findById(id)
                ]).catch(e => {
                    throw new common_1.NotFoundException('User or org not found');
                });
                if (userFollower) {
                    let { following } = userFollower;
                    following.push(userId);
                    await userFollower.save();
                }
                if (orgFollower) {
                    let { following } = orgFollower;
                    following.push(userId);
                    await orgFollower.save();
                }
                const { followers } = user;
                const fx = followers;
                fx.push(id);
                user.followers = fx;
                await user.save();
                return 'Followed';
            }
            if (org) {
                const res = org.followers.find(item => item.toString() === id.toString());
                if (res)
                    throw new common_1.BadRequestException('User already following');
                const [userFollower, orgFollower] = await Promise.all([
                    this.userModel.findById(id),
                    this.orgModel.findById(id)
                ]).catch(e => {
                    throw new common_1.NotFoundException('User or org not found');
                });
                if (userFollower) {
                    let { following } = userFollower;
                    following.push(userId);
                    await userFollower.save();
                }
                if (orgFollower) {
                    let { following } = orgFollower;
                    following.push(userId);
                    await orgFollower.save();
                }
                const { followers } = org;
                const fx = followers;
                fx.push(id);
                org.followers = fx;
                await org.save();
                return 'Followed';
            }
            return 'Failed';
        }
        catch (error) {
            throw error;
        }
    }
    async unFollow(id, userId) {
        try {
            const [user, org] = await Promise.all([
                this.userModel.findById(userId),
                this.orgModel.findById(userId)
            ]).catch(e => {
                throw new common_1.NotFoundException('User or org not found');
            });
            const userIsFollowing = user.followers.filter(item => item !== id);
            user.followers = userIsFollowing;
            await user.save();
            const unFollowedUser = await this.userModel.findById(id);
            const followers = unFollowedUser.following.filter(item => item !== userId);
            unFollowedUser.following = followers;
            await unFollowedUser.save();
            return 'payload';
        }
        catch (error) {
            throw error;
        }
    }
    async timeLine(authorId) {
        console.log(authorId);
        const [user, org] = await Promise.all([
            this.userModel.findById(authorId),
            this.orgModel.findById(authorId)
        ]).catch(e => {
            throw new common_1.NotFoundException('User or org not found');
        });
        try {
            if (user) {
                const [victories, adverts, posts, petitions, events, updates] = await Promise.all([
                    this.VictoryModel.find({ authorId: { $in: user.following } })
                        .sort({ createdAt: 'desc' }),
                    this.advertModel.find({ authorId: { $in: user.following } }),
                    this.postModel.find({ author: { $in: user.following } }),
                    this.PetitionModel.find({ authorId: { $in: user.following } }),
                    this.eventModel.find({ authorId: { $in: user.following } }),
                    this.UpdateModel.find({ authorId: { $in: user.following } })
                ]);
                console.log(updates);
                return {
                    adverts,
                    events,
                    petitions,
                    posts,
                    victories,
                    updates
                };
            }
            if (org) {
                const [victories, adverts, posts, petitions, events, updates,] = await Promise.all([
                    this.VictoryModel.find({ authorId: { $in: org.following } })
                        .sort({ createdAt: 'desc' }),
                    this.advertModel.find({ authorId: { $in: org.following } }),
                    this.postModel.find({ author: { $in: org.following } }),
                    this.PetitionModel.find({ authorId: { $in: org.following } }),
                    this.eventModel.find({ authorId: { $in: org.following } }),
                    this.UpdateModel.find({ authorId: { $in: user.following } })
                ]);
                return {
                    adverts,
                    events,
                    petitions,
                    posts,
                    victories,
                    updates
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
};
GeneralService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(update_schema_1.Update.name)),
    __param(2, (0, mongoose_1.InjectModel)(advert_1.Advert.name)),
    __param(3, (0, mongoose_1.InjectModel)(organization_schema_1.orgnaization.name)),
    __param(4, (0, mongoose_1.InjectModel)(event_1.event.name)),
    __param(5, (0, mongoose_1.InjectModel)(petition_schema_1.Petition.name)),
    __param(6, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __param(7, (0, mongoose_1.InjectModel)(victory_entity_1.Victory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], GeneralService);
exports.GeneralService = GeneralService;
//# sourceMappingURL=general.service.js.map