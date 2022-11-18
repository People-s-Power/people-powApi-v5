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
exports.orgnaizationSchema = exports.orgnaization = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let orgnaization = class orgnaization {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], orgnaization.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], orgnaization.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], orgnaization.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], orgnaization.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], orgnaization.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], orgnaization.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], orgnaization.prototype, "followers", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], orgnaization.prototype, "following", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], orgnaization.prototype, "operators", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Add social' }),
    __metadata("design:type", String)
], orgnaization.prototype, "facebook", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Add social' }),
    __metadata("design:type", String)
], orgnaization.prototype, "linkedIn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Add social' }),
    __metadata("design:type", String)
], orgnaization.prototype, "instagram", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Add social' }),
    __metadata("design:type", String)
], orgnaization.prototype, "twitter", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], orgnaization.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], orgnaization.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], orgnaization.prototype, "website", void 0);
orgnaization = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], orgnaization);
exports.orgnaization = orgnaization;
exports.orgnaizationSchema = mongoose_1.SchemaFactory.createForClass(orgnaization);
//# sourceMappingURL=organization.schema.js.map