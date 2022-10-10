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
exports.PetitionSchema = exports.ViewSchema = exports.View = exports.Petition = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const petition_interface_1 = require("../dto/petition.interface");
let Petition = class Petition {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Petition.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Petition.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Petition.prototype, "aim", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Petition.prototype, "target", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Petition.prototype, "body", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, slug: 'title' }),
    __metadata("design:type", String)
], Petition.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Petition.prototype, "excerpt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: petition_interface_1.PetitionStatusEnum,
        default: petition_interface_1.PetitionStatusEnum.Active,
    }),
    __metadata("design:type", String)
], Petition.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Petition.prototype, "featured", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Petition.prototype, "authorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Petition.prototype, "authorName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Petition.prototype, "authorImg", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Petition.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Petition.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Petition.prototype, "addedFrom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Petition.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.Types.ObjectId, ref: 'Endorsement', autopopulate: true }],
    }),
    __metadata("design:type", Array)
], Petition.prototype, "endorsements", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.Types.ObjectId, ref: 'User', autopopulate: true }],
    }),
    __metadata("design:type", Array)
], Petition.prototype, "endorserIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, defalut: 0 }),
    __metadata("design:type", Number)
], Petition.prototype, "numberOfPaidEndorsementCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, defalut: 0 }),
    __metadata("design:type", Number)
], Petition.prototype, "numberOfPaidViewsCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'User', autopopulate: true }] }),
    __metadata("design:type", Array)
], Petition.prototype, "likes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Petition.prototype, "likeCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Petition.prototype, "promoted", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.Types.ObjectId, ref: 'View', autopopulate: true }],
    }),
    __metadata("design:type", Array)
], Petition.prototype, "views", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Petition.prototype, "region", void 0);
Petition = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                doc.id = doc._id;
                delete ret._id;
                delete doc._id;
                return ret;
            },
        },
    })
], Petition);
exports.Petition = Petition;
let View = class View {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Object)
], View.prototype, "user", void 0);
View = __decorate([
    (0, mongoose_1.Schema)()
], View);
exports.View = View;
exports.ViewSchema = mongoose_1.SchemaFactory.createForClass(View);
exports.PetitionSchema = mongoose_1.SchemaFactory.createForClass(Petition);
//# sourceMappingURL=petition.schema.js.map