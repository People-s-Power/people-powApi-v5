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
exports.PostResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_guard_1 = require("../auth/guards/graphql.guard");
const post_service_1 = require("./post.service");
let PostResolver = class PostResolver {
    constructor(postService) {
        this.postService = postService;
    }
    async getPosts(limit) {
        const posts = await this.postService.findAll(limit);
        return posts;
    }
    async getPost(id) {
        const post = await this.postService.findOne(id);
        return post;
    }
    async myPosts(user) {
        const userId = user._id.toString();
        const posts = await this.postService.user(userId);
        return posts;
    }
    async createPost({ body, imageFile }, user) {
        const post = await this.postService.create({ body, imageFile, user });
        return post;
    }
    async updatePost({ body, postId, authorId }, user) {
        const userId = user._id.toString();
        const post = await this.postService.update({ body, postId, authorId });
        return post;
    }
    async updateImg({ imageFile, postId, authorId, }) {
        const post = await this.postService.image(imageFile, postId, authorId);
        return post;
    }
    async deletePost({ postId, authorId, }) {
        const post = await this.postService.delete(postId, authorId);
        return post;
    }
};
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getPosts", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getPost", null);
__decorate([
    (0, common_1.UseGuards)(graphql_guard_1.GQLoginGuard),
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "myPosts", null);
__decorate([
    (0, common_1.UseGuards)(graphql_guard_1.GQLoginGuard),
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, common_1.UseGuards)(graphql_guard_1.GQLoginGuard),
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
__decorate([
    (0, common_1.UseGuards)(graphql_guard_1.GQLoginGuard),
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updateImg", null);
__decorate([
    (0, common_1.UseGuards)(graphql_guard_1.GQLoginGuard),
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
PostResolver = __decorate([
    (0, graphql_1.Resolver)('Post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.resolver.js.map