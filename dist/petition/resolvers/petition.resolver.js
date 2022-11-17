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
exports.PetitionResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_guard_1 = require("../../auth/guards/graphql.guard");
const petition_service_1 = require("../services/petition.service");
const endorsement_service_1 = require("../services/endorsement.service");
let PetitionResolver = class PetitionResolver {
    constructor(petitionService, endorsementService) {
        this.petitionService = petitionService;
        this.endorsementService = endorsementService;
    }
    async myPetition(user) {
        return await this.petitionService.myPetitions(user === null || user === void 0 ? void 0 : user.id);
    }
    async getPetitions(limit, location) {
        const region = location.country_name;
        return await this.petitionService.findAll(region);
    }
    async getPetitionsOtherRegion() {
        return await this.petitionService.findAllOtherRegions();
    }
    async getPetition(slug) {
        return await this.petitionService.findOne(slug);
    }
    async getActivePetitions(limit) {
        return await this.petitionService.findAllActive();
    }
    async getActivePetitionsOtherRegion(limit, location) {
        const region = location.country_name;
        return await this.petitionService.findAllActiveOtherRegions;
    }
    async deletePetition(id) {
        return await this.petitionService.delete(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(graphql_guard_1.GQLoginGuard),
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PetitionResolver.prototype, "myPetition", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('limit')),
    __param(1, (0, graphql_guard_1.locationGLQ)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PetitionResolver.prototype, "getPetitions", null);
__decorate([
    (0, graphql_1.Query)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PetitionResolver.prototype, "getPetitionsOtherRegion", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PetitionResolver.prototype, "getPetition", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PetitionResolver.prototype, "getActivePetitions", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('limit')),
    __param(1, (0, graphql_guard_1.locationGLQ)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PetitionResolver.prototype, "getActivePetitionsOtherRegion", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PetitionResolver.prototype, "deletePetition", null);
PetitionResolver = __decorate([
    (0, graphql_1.Resolver)('Petition'),
    __metadata("design:paramtypes", [petition_service_1.PetitionService,
        endorsement_service_1.EndorsementService])
], PetitionResolver);
exports.PetitionResolver = PetitionResolver;
//# sourceMappingURL=petition.resolver.js.map