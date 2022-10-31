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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const petition_schema_1 = require("../petition/schema/petition.schema");
const user_schema_1 = require("../user/entity/user.schema");
const cloudinary_1 = require("../utils/cloudinary");
const post_schema_1 = require("./schema/post.schema");
let PostService = class PostService {
    constructor(postModel, userModel, PetitionModel) {
        this.postModel = postModel;
        this.userModel = userModel;
        this.PetitionModel = PetitionModel;
    }
    async findAll(limit) {
        try {
            const posts = await this.postModel
                .find()
                .sort({ createdAt: -1 })
                .limit(limit)
                .populate('author')
                .populate('petition');
            return posts.map(post => {
                return Object.assign(Object.assign({}, post._doc), { shares: post.shares.length, likes: post.likes.length });
            });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async findOne(postId) {
        try {
            const post = await this.postModel.findById(postId)
                .populate('author')
                .populate('petition');
            if (!post)
                throw new common_1.NotFoundException('Post not Found');
            return Object.assign(Object.assign({}, post._doc), { shares: post.shares.length, likes: post.likes.length });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async user(userId) {
        try {
            const posts = await this.postModel.find({
                author: userId
            });
            return posts;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async create({ body, user, imageFile }) {
        const image = await (0, cloudinary_1.cloudinaryUpload)(imageFile).catch((err) => {
            throw err;
        });
        try {
            const petition = await this.PetitionModel.create({
                title: 'fill',
                category: 'fill',
                aim: 'fill',
                target: 'fill',
                body: 'fill',
                authorId: user.id,
                authorName: user.name,
                authorImg: user.image || 'No img',
                excerpt: 'Fill',
                image,
                slug: body.split(" ").join("-").toLowerCase(),
                numberOfPaidEndorsementCount: 0,
                numberOfPaidViewsCount: 0,
                region: user.country,
            });
            const post = await this.postModel.create({
                body,
                image,
                author: user,
                petition: petition,
            });
            return post;
        }
        catch (error) {
            console.log();
            throw error;
        }
    }
    async update({ body, userId, postId }) {
        try {
            const post = await this.postModel.findById(postId)
                .populate('author')
                .populate('petition');
            const author = post.author;
            if ((author === null || author === void 0 ? void 0 : author._id.toString()) !== userId)
                throw new common_1.UnauthorizedException('Your not allowed to update');
            post.body = body;
            await post.save();
            return Object.assign(Object.assign({}, post._doc), { shares: post.shares.length, likes: post.likes.length });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async image(imageFile, postId, userId) {
        try {
            const post = await this.postModel.findById(postId)
                .populate('author')
                .populate('petition');
            const author = post.author;
            if ((author === null || author === void 0 ? void 0 : author._id.toString()) !== userId)
                throw new common_1.UnauthorizedException('Your not allowed to update');
            const image = await (0, cloudinary_1.cloudinaryUpload)(imageFile).catch((err) => {
                throw err;
            });
            post.image = image;
            await post.save();
            return Object.assign(Object.assign({}, post._doc), { shares: post.shares.length, likes: post.likes.length });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(petition_schema_1.Petition.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map