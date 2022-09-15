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
exports.OrganizationResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_guard_1 = require("../auth/guards/graphql.guard");
const organization_service_1 = require("./organization.service");
let OrganizationResolver = class OrganizationResolver {
    constructor(organizationService) {
        this.organizationService = organizationService;
    }
    getOrganzations() {
        return this.organizationService.getOrganizations();
    }
    getOrganzation(Id) {
        return this.organizationService.getOrg(Id);
    }
    getUserOrganizations(Id) {
        return this.organizationService.userOrgs(Id);
    }
    createOrg(payload, user) {
        const { input } = payload;
        return this.organizationService.createOrg(input, user);
    }
};
__decorate([
    (0, graphql_1.Query)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "getOrganzations", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "getOrganzation", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "getUserOrganizations", null);
__decorate([
    (0, common_1.UseGuards)(graphql_guard_1.GQLoginGuard),
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "createOrg", null);
OrganizationResolver = __decorate([
    (0, graphql_1.Resolver)('Organization'),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService])
], OrganizationResolver);
exports.OrganizationResolver = OrganizationResolver;
//# sourceMappingURL=organization.resolver.js.map