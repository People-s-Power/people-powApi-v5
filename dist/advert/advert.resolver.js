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
exports.AdvertResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_guard_1 = require("../auth/guards/graphql.guard");
const advert_service_1 = require("./advert.service");
let AdvertResolver = class AdvertResolver {
    constructor(advertService) {
        this.advertService = advertService;
    }
    async adverts({ page, limit, filter }) {
        const adverts = await this.advertService.findAll(page, limit, filter);
        return adverts;
    }
    async advert(advertId) {
        const advert = await this.advertService.findOne(advertId);
        return advert;
    }
    async myAdverts({ authorId, page, limit, filter }) {
        console.log(authorId, page, limit, filter);
        const events = await this.advertService.findAll(page, limit, filter, authorId);
        return events;
    }
    async createdAd({ caption, message, email, duration, link, action, audience, imageFile }, user) {
        const advert = await this.advertService.create({ caption, message, email, duration, link, action, audience, imageFile }, user);
        return advert;
    }
    async createdAdOrg({ caption, message, email, duration, link, action, audience, imageFile, authorId }) {
        const advert = await this.advertService.createOrg({ caption, message, email, duration, link, action, audience, imageFile }, authorId);
        return advert;
    }
    async updateAd({ caption, message, email, duration, link, action, audience, imageFile, advertId, authorId }) {
        const advert = await this.advertService.update({ caption, message, email, duration, link, action, audience, imageFile }, advertId, authorId);
        return advert;
    }
};
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdvertResolver.prototype, "adverts", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('advertId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdvertResolver.prototype, "advert", null);
__decorate([
    (0, common_1.UseGuards)(graphql_guard_1.GQLoginGuard),
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdvertResolver.prototype, "myAdverts", null);
__decorate([
    (0, common_1.UseGuards)(graphql_guard_1.GQLoginGuard),
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdvertResolver.prototype, "createdAd", null);
__decorate([
    (0, common_1.UseGuards)(graphql_guard_1.GQLoginGuard),
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdvertResolver.prototype, "createdAdOrg", null);
__decorate([
    (0, common_1.UseGuards)(graphql_guard_1.GQLoginGuard),
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdvertResolver.prototype, "updateAd", null);
AdvertResolver = __decorate([
    (0, graphql_1.Resolver)('Advert'),
    __metadata("design:paramtypes", [advert_service_1.AdvertService])
], AdvertResolver);
exports.AdvertResolver = AdvertResolver;
//# sourceMappingURL=advert.resolver.js.map