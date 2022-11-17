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
const post_schema_1 = require("../post/schema/post.schema");
const user_schema_1 = require("../user/entity/user.schema");
const victory_entity_1 = require("../victory/entities/victory.entity");
let GeneralService = class GeneralService {
    constructor(userModel, advertModel, orgModel, eventModel, PetitionModel, postModel, VictoryModel) {
        this.userModel = userModel;
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
        const [petition, victory, advert, event, post] = await Promise.all([
            this.PetitionModel.findById(itemId),
            this.VictoryModel.findById(itemId),
            this.advertModel.findById(itemId),
            this.eventModel.findById(itemId),
            this.postModel.findById(itemId)
        ]).catch((e) => {
            throw new Error(`Can't find activity`);
        });
        if (petition) {
            const liked = this.checkIfLiked(petition.likes, authorId);
            if (liked)
                throw new common_1.BadRequestException('Liked by user');
            petition.likes.push(authorId);
            await petition.save();
            return 'Sucess';
        }
        if (victory) {
            const liked = this.checkIfLiked(victory.likes, authorId);
            if (liked)
                throw new common_1.BadRequestException('Liked by user');
            victory.likes.push(authorId);
            await victory.save();
            return 'Sucess';
        }
        if (advert) {
            const liked = this.checkIfLiked(advert.likes, authorId);
            if (liked)
                throw new common_1.BadRequestException('Liked by user');
            advert.likes.push(authorId);
            await advert.save();
            return 'Sucess';
        }
        if (event) {
            const liked = this.checkIfLiked(event.likes, authorId);
            if (liked)
                throw new common_1.BadRequestException('Liked by user');
            event.likes.push(authorId);
            await event.save();
            return 'Sucess';
        }
        if (post) {
            const liked = this.checkIfLiked(post.likes, authorId);
            if (liked)
                throw new common_1.BadRequestException('Liked by user');
            post.likes.push(authorId);
            await post.save();
            return 'Sucess';
        }
        return 'Failed';
    }
    async unlike(itemId, authorId) {
        const [petition, victory, advert, event, post] = await Promise.all([
            this.PetitionModel.findById(itemId),
            this.VictoryModel.findById(itemId),
            this.advertModel.findById(itemId),
            this.eventModel.findById(itemId),
            this.postModel.findById(itemId)
        ]).catch((e) => {
            throw new Error(`Can't find activity`);
        });
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
        return 'Failed!';
    }
    checkIfLiked(list, authorId) {
        const liked = list.find(item => item.toString() === authorId.toString());
        return liked;
    }
    updateLikes(list, authorId) {
        const unliked = list.filter(item => item.toString() !== authorId.toString());
        return unliked;
    }
    remove(id) {
        return `This action removes a #${id} general`;
    }
};
GeneralService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(advert_1.Advert.name)),
    __param(2, (0, mongoose_1.InjectModel)(organization_schema_1.orgnaization.name)),
    __param(3, (0, mongoose_1.InjectModel)(event_1.event.name)),
    __param(4, (0, mongoose_1.InjectModel)(petition_schema_1.Petition.name)),
    __param(5, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __param(6, (0, mongoose_1.InjectModel)(victory_entity_1.Victory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], GeneralService);
exports.GeneralService = GeneralService;
//# sourceMappingURL=general.service.js.map