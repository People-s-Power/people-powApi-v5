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
exports.OrgSchema = exports.Org = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Org = class Org {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Org.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({ require: true, unique: true }),
    __metadata("design:type", String)
], Org.prototype, "orgName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ require: true, unique: true }),
    __metadata("design:type", String)
], Org.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ require: true }),
    __metadata("design:type", String)
], Org.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ require: true, unique: true }),
    __metadata("design:type", String)
], Org.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Org.prototype, "followers", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Org.prototype, "following", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Org.prototype, "followersCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Org.prototype, "followingCount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Org.prototype, "operators", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Facebook link' }),
    __metadata("design:type", String)
], Org.prototype, "facebook", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'linkedIn link' }),
    __metadata("design:type", String)
], Org.prototype, "linkedIn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Instagram link' }),
    __metadata("design:type", String)
], Org.prototype, "instagram", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'twitter link' }),
    __metadata("design:type", String)
], Org.prototype, "twitter", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Org.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Org.prototype, "city", void 0);
Org = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                doc.id = doc._id;
                delete ret._id;
                delete doc._id;
                ret.name = ret.firstName + ' ' + ret.lastName;
                doc.name = doc.firstName + ' ' + doc.lastName;
                return ret;
            },
        },
    }),
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], Org);
exports.Org = Org;
exports.OrgSchema = mongoose_1.SchemaFactory.createForClass(Org);
//# sourceMappingURL=org.schema.js.map