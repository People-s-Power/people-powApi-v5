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
exports.AdvertService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const organization_schema_1 = require("../organization/schema/organization.schema");
const user_schema_1 = require("../user/entity/user.schema");
const cloudinary_1 = require("../utils/cloudinary");
const advert_1 = require("./schema/advert");
let AdvertService = class AdvertService {
    constructor(advertModel, userModel, orgModel) {
        this.advertModel = advertModel;
        this.userModel = userModel;
        this.orgModel = orgModel;
    }
    async findAll(page, limit, filter, authorId) {
        const adverts = await this.advertModel.find(Object.assign(Object.assign({}, (filter && {
            $or: [{ name: filter }, { description: filter }, { audience: filter }],
        })), (authorId && { authorId: authorId })))
            .sort("-createdAt")
            .limit(limit)
            .skip(limit * (page - 1))
            .catch(e => { throw e; });
        const result = await Promise.all(adverts.map(async (item) => {
            if (item.author === 'User') {
                const user = await this.userModel.findById(item.authorId);
                return Object.assign(Object.assign({}, item._doc), { author: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        image: user.image
                    }, shares: item.shares.length, likes: item.likes });
            }
            const org = await this.orgModel.findById(item.authorId);
            return Object.assign(Object.assign({}, item._doc), { author: {
                    _id: org._id,
                    name: org.name,
                    email: org.email,
                    image: org.image
                }, shares: item.shares.length, likes: item.likes });
        }));
        return result;
    }
    async findOne(advertId) {
        const advert = await this.advertModel.findOne(Object.assign({}, (advertId && { _id: advertId })));
        if (advert.author === 'User') {
            const user = await this.userModel.findById(advert.authorId);
            return Object.assign(Object.assign({}, advert._doc), { author: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                }, shares: advert.shares.length, likes: advert.likes });
        }
        const org = await this.orgModel.findById(advert.authorId);
        return Object.assign(Object.assign({}, advert._doc), { author: {
                _id: org._id,
                name: org.name,
                email: org.email,
                image: org.image
            }, shares: advert.shares.length, likes: advert.likes });
    }
    async create(data, user) {
        const image = await (0, cloudinary_1.cloudinaryUpload)(data.imageFile).catch((err) => {
            throw err;
        });
        const advert = await this.advertModel.create(Object.assign(Object.assign({}, data), { image, authorId: user._id, author: 'User' }));
        return Object.assign(Object.assign({}, advert._doc), { author: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            }, shares: advert.shares.length, likes: advert.likes });
    }
    async createOrg(data, authorId) {
        const org = await this.orgModel.findById(authorId);
        if (!org) {
            throw new common_1.NotFoundException('Orgnaization not found');
        }
        const image = await (0, cloudinary_1.cloudinaryUpload)(data.imageFile).catch((err) => {
            throw err;
        });
        const advert = await this.advertModel.create(Object.assign(Object.assign({}, data), { image, authorId: org._id, author: 'orgnaization' }));
        return Object.assign(Object.assign({}, advert._doc), { author: {
                _id: org._id,
                name: org.name,
                email: org.email,
                image: org.image
            }, shares: advert.shares.length, likes: advert.likes });
    }
    async update(data, advertId, authorId) {
        const advert = await this.advertModel.findById(advertId);
        if (advert.authorId.toString() !== authorId.toString()) {
            throw new common_1.UnauthorizedException('Your not allowed to delete');
        }
        const image = await (0, cloudinary_1.cloudinaryUpload)(data.imageFile).catch((err) => {
            throw err;
        });
        const advertItem = await this.advertModel.findOneAndUpdate({ _id: advertId }, Object.assign(Object.assign({}, data), { image }), { new: true });
        if (advert.author === 'User') {
            const user = await this.userModel.findById(advertItem.authorId);
            return Object.assign(Object.assign({}, advertItem._doc), { author: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                }, shares: advertItem.shares.length, likes: advertItem.likes });
        }
        const org = await this.orgModel.findById(advertItem.authorId);
        return Object.assign(Object.assign({}, advertItem._doc), { author: {
                _id: org._id,
                name: org.name,
                email: org.email,
                image: org.image
            }, shares: advertItem.shares.length, likes: advertItem.likes });
    }
};
AdvertService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(advert_1.Advert.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(organization_schema_1.orgnaization.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], AdvertService);
exports.AdvertService = AdvertService;
//# sourceMappingURL=advert.service.js.map