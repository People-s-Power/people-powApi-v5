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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const organization_schema_1 = require("../organization/schema/organization.schema");
const user_schema_1 = require("../user/entity/user.schema");
const cloudinary_1 = require("../utils/cloudinary");
const event_1 = require("./schema/event");
let EventService = class EventService {
    constructor(eventModel, userModel, orgModel) {
        this.eventModel = eventModel;
        this.userModel = userModel;
        this.orgModel = orgModel;
    }
    async findAll(page, limit, filter) {
        const events = await this.eventModel.find(Object.assign({}, (filter && {
            $or: [{ name: filter }, { description: filter }, { audience: filter }],
        })))
            .sort("-createdAt")
            .limit(limit)
            .skip(limit * (page - 1))
            .catch(e => { throw e; });
        const result = await Promise.all(events.map(async (item) => {
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
    async create(data, user) {
        const image = await (0, cloudinary_1.cloudinaryUpload)(data.imageFile).catch((err) => {
            throw err;
        });
        const event = await this.eventModel.create(Object.assign(Object.assign({}, data), { image, authorId: user._id, author: 'User' }));
        return Object.assign(Object.assign({}, event._doc), { author: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            }, shares: event.shares.length, likes: event.likes.length });
    }
    async createOrg(data, authorId) {
        const org = await this.orgModel.findById(authorId);
        if (!org) {
            throw new common_1.NotFoundException('Orgnaization not found');
        }
        const image = await (0, cloudinary_1.cloudinaryUpload)(data.imageFile).catch((err) => {
            throw err;
        });
        const event = await this.eventModel.create(Object.assign(Object.assign({}, data), { image, authorId: org._id, author: 'orgnaization' }));
        return Object.assign(Object.assign({}, event._doc), { author: {
                _id: org._id,
                name: org.name,
                email: org.email,
                image: org.image
            }, shares: event.shares.length, likes: event.likes.length });
    }
    async update(data, eventId, authorId) {
        const event = await this.eventModel.findById(eventId);
        if (event.authorId.toString() !== authorId.toString()) {
            throw new common_1.UnauthorizedException('Your not allowed to delete');
        }
        const image = await (0, cloudinary_1.cloudinaryUpload)(data.imageFile).catch((err) => {
            throw err;
        });
        const eventItem = await this.eventModel.findOneAndUpdate({ _id: eventId }, Object.assign(Object.assign({}, data), { image }), { new: true });
        if (event.author === 'User') {
            const user = await this.userModel.findById(eventItem.authorId);
            return Object.assign(Object.assign({}, eventItem._doc), { author: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                }, shares: eventItem.shares.length, likes: eventItem.likes.length });
        }
        const org = await this.orgModel.findById(eventItem.authorId);
        return Object.assign(Object.assign({}, eventItem._doc), { author: {
                _id: org._id,
                name: org.name,
                email: org.email,
                image: org.image
            }, shares: eventItem.shares.length, likes: eventItem.likes.length });
    }
    async remove(eventId, authorId) {
        const event = await this.eventModel.findById(eventId);
        if (event.authorId.toString() !== authorId.toString()) {
            throw new common_1.UnauthorizedException('Your not allowed to delete');
        }
        const item = await this.eventModel.findByIdAndDelete(eventId);
        return item;
    }
};
EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(event_1.event.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(organization_schema_1.orgnaization.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map