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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = exports.Post = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Post = class Post {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Petition' }),
    __metadata("design:type", Object)
], Post.prototype, "petition", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', autopopulate: true }),
    __metadata("design:type", Object)
], Post.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'orgnaization', autopopulate: true }),
    __metadata("design:type", Object)
], Post.prototype, "org", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "body", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Post.prototype, "likes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Post.prototype, "shares", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Post.prototype, "isPetition", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '//fsdsdf' }),
    __metadata("design:type", String)
], Post.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Post.prototype, "promoted", void 0);
Post = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                return ret;
            },
        },
    })
], Post);
exports.Post = Post;
exports.PostSchema = mongoose_1.SchemaFactory.createForClass(Post);
//# sourceMappingURL=post.schema.js.map