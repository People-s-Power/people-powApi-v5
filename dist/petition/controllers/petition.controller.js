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
exports.PetitionController = void 0;
const common_1 = require("@nestjs/common");
const petition_dto_1 = require("../dto/petition.dto");
const petition_gateway_1 = require("../gateway/petition.gateway");
const petition_service_1 = require("../services/petition.service");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
let PetitionController = class PetitionController {
    constructor(petitionService, petitionGateway) {
        this.petitionService = petitionService;
        this.petitionGateway = petitionGateway;
    }
    create(data, req) {
        return this.petitionService.create(data, req.user);
    }
    createCampForOrg(data, param) {
        return this.petitionService.createForOrg(data);
    }
    async getSession(id, req) {
        const petition = await this.petitionService.updateSession(id, req.sessionID);
        return petition.id;
    }
    findAll() {
        return this.petitionService.findAll();
    }
    findAllNotice(model) {
        return this.petitionService.findAllNotice(model);
    }
    findOne(slug) {
        return this.petitionService.findOne(slug);
    }
    async mypetition(req) {
        var _a;
        return this.petitionService.myPetitions((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
    }
    async orgpetition(param) {
        const { orgId } = param;
        return this.petitionService.myPetitions(orgId);
    }
    update(data) {
        return this.petitionService.update(data);
    }
    async delete(id) {
        const petition = await this.petitionService.delete(id);
        return petition.id;
    }
    async like(id, req) {
        return await this.petitionService.like(id, req.user);
    }
    async approvepetition(data) {
        return await this.petitionService.approvePetition(data.Petition_id);
    }
    async viewCamp(id, data) {
        const userId = data.userId;
        const result = await this.petitionService.viewPetition(id, userId);
        return result;
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [petition_dto_1.CreatePetitionDTO, Object]),
    __metadata("design:returntype", void 0)
], PetitionController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/org'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [petition_dto_1.CreatePetitionOrgDTO, Object]),
    __metadata("design:returntype", void 0)
], PetitionController.prototype, "createCampForOrg", null);
__decorate([
    (0, common_1.Get)('session/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PetitionController.prototype, "getSession", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PetitionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('notice'),
    __param(0, (0, common_1.Query)('model')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PetitionController.prototype, "findAllNotice", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PetitionController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('mypetition'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PetitionController.prototype, "mypetition", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('orgpetition/:orgId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PetitionController.prototype, "orgpetition", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [petition_dto_1.UpdatePetitionDTO]),
    __metadata("design:returntype", void 0)
], PetitionController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/single/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PetitionController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('like'),
    __param(0, (0, common_1.Body)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PetitionController.prototype, "like", null);
__decorate([
    (0, common_1.Post)('approve'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PetitionController.prototype, "approvepetition", null);
__decorate([
    (0, common_1.Put)('/viewCamp/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PetitionController.prototype, "viewCamp", null);
PetitionController = __decorate([
    (0, common_1.Controller)('api/v3/petition'),
    __metadata("design:paramtypes", [petition_service_1.PetitionService,
        petition_gateway_1.PetitionGateway])
], PetitionController);
exports.PetitionController = PetitionController;
//# sourceMappingURL=petition.controller.js.map