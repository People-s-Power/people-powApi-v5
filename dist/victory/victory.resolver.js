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
const create_victory_input_1 = require("./dto/create-victory.input");
const update_victory_input_1 = require("./dto/update-victory.input");
let VictoryResolver = class VictoryResolver {
    constructor(victoryService) {
        this.victoryService = victoryService;
    }
    create(createVictoryInput) {
        return this.victoryService.create(createVictoryInput);
    }
    findAll() {
        return this.victoryService.findAll();
    }
    findOne(id) {
        return this.victoryService.findOne(id);
    }
    update(updateVictoryInput) {
        return this.victoryService.update(updateVictoryInput.id, updateVictoryInput);
    }
    remove(id) {
        return this.victoryService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)('createVictory'),
    __param(0, (0, graphql_1.Args)('createVictoryInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_victory_input_1.CreateVictoryInput]),
    __metadata("design:returntype", void 0)
], VictoryResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)('victories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VictoryResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)('victory'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VictoryResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)('updateVictory'),
    __param(0, (0, graphql_1.Args)('updateVictoryInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_victory_input_1.UpdateVictoryInput]),
    __metadata("design:returntype", void 0)
], VictoryResolver.prototype, "update", null);
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