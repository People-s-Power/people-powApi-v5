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
exports.VictoryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const victory_service_1 = require("./victory.service");
let VictoryResolver = class VictoryResolver {
    constructor(victoryService) {
        this.victoryService = victoryService;
    }
    async createVictory({ body, authorId }) {
        const victory = await this.victoryService.create(body, authorId);
        return victory;
    }
    async findAll({ page, limit, filter }) {
        const victories = await this.victoryService.findAll(page, limit, filter);
        return victories;
    }
    async findOne(id) {
        const victory = await this.victoryService.findOne(id);
        return victory;
    }
    async myVictories(authorId, page, limit, filter) {
        console.log(authorId, page, limit, filter);
        const victories = await this.victoryService.findAll(page, limit, filter, authorId);
        return victories;
    }
    remove(id) {
        return this.victoryService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)('createVictory'),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VictoryResolver.prototype, "createVictory", null);
__decorate([
    (0, graphql_1.Query)('victories'),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VictoryResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)('victory'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VictoryResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)('myVictories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], VictoryResolver.prototype, "myVictories", null);
__decorate([
    (0, graphql_1.Mutation)('removeVictory'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VictoryResolver.prototype, "remove", null);
VictoryResolver = __decorate([
    (0, graphql_1.Resolver)('Victory'),
    __metadata("design:paramtypes", [victory_service_1.VictoryService])
], VictoryResolver);
exports.VictoryResolver = VictoryResolver;
//# sourceMappingURL=victory.resolver.js.map