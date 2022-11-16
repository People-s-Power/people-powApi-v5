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
exports.VictoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const organization_schema_1 = require("../organization/schema/organization.schema");
const user_schema_1 = require("../user/entity/user.schema");
const victory_entity_1 = require("./entities/victory.entity");
let VictoryService = class VictoryService {
    constructor(VictoryModel, userModel, orgModel) {
        this.VictoryModel = VictoryModel;
        this.userModel = userModel;
        this.orgModel = orgModel;
    }
    async create(body, authorId) {
        const user = await this.userModel.findById(authorId);
        const org = await this.orgModel.findById(authorId);
        let author = user;
        let authorEnum = 'User';
        if (!user) {
            author = org;
            authorEnum = 'orgnaization';
        }
        console.log(author === null || author === void 0 ? void 0 : author.name);
        const victory = await this.VictoryModel.create({
            body,
            authorId,
            author: authorEnum
        });
        return Object.assign(Object.assign({}, victory._doc), { author, shares: victory.shares.length, likes: victory.likes.length });
    }
    async findAll(page, limit, filter, authorId) {
        const victories = await this.VictoryModel.find(Object.assign(Object.assign({}, (filter && {
            $or: [{ name: filter }, { description: filter }, { audience: filter }],
        })), (authorId && { authorId: authorId })))
            .sort("-createdAt")
            .limit(limit)
            .skip(limit * (page - 1))
            .catch(e => { throw e; });
        const result = await Promise.all(victories.map(async (item) => {
            if (item.author === 'User') {
                const user = await this.userModel.findById(item.authorId);
                return Object.assign(Object.assign({}, item._doc), { author: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        image: user.image
                    }, shares: item.shares.length, likes: item.likes.length });
            }
            const org = await this.orgModel.findById(item.authorId);
            return Object.assign(Object.assign({}, item._doc), { author: {
                    _id: org._id,
                    name: org.name,
                    email: org.email,
                    image: org.image
                }, shares: item.shares.length, likes: item.likes.length });
        }));
        return result;
    }
    async findOne(victoryId) {
        const victory = await this.VictoryModel.findOne(Object.assign({}, (victoryId && { _id: victoryId })));
        if (victory.author === 'User') {
            const user = await this.userModel.findById(victory.authorId);
            return Object.assign(Object.assign({}, victory._doc), { author: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                }, shares: victory.shares.length, likes: victory.likes.length });
        }
        const org = await this.orgModel.findById(victory.authorId);
        return Object.assign(Object.assign({}, victory._doc), { author: {
                _id: org._id,
                name: org.name,
                email: org.email,
                image: org.image
            }, shares: victory.shares.length, likes: victory.likes.length });
    }
    remove(id) {
        return `This action removes a #${id} victory`;
    }
};
VictoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(victory_entity_1.Victory.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(organization_schema_1.orgnaization.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], VictoryService);
exports.VictoryService = VictoryService;
//# sourceMappingURL=victory.service.js.map