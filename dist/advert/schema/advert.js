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
exports.AdvertSchema = exports.Advert = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
let Advert = class Advert {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Advert.prototype, "caption", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Advert.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Advert.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Advert.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Advert.prototype, "link", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Advert.prototype, "action", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Advert.prototype, "audience", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Advert.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Advert.prototype, "shares", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Advert.prototype, "likes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Advert.prototype, "promoted", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['User', 'orgnaization'],
        default: 'User'
    }),
    __metadata("design:type", String)
], Advert.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Advert.prototype, "authorId", void 0);
Advert = __decorate([
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
], Advert);
exports.Advert = Advert;
exports.AdvertSchema = mongoose_1.SchemaFactory.createForClass(Advert);
//# sourceMappingURL=advert.js.map