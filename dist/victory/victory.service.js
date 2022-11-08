"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VictoryService = void 0;
const common_1 = require("@nestjs/common");
let VictoryService = class VictoryService {
    create(createVictoryInput) {
        return 'This action adds a new victory';
    }
    findAll() {
        return `This action returns all victory`;
    }
    findOne(id) {
        return `This action returns a #${id} victory`;
    }
    update(id, updateVictoryInput) {
        return `This action updates a #${id} victory`;
    }
    remove(id) {
        return `This action removes a #${id} victory`;
    }
};
VictoryService = __decorate([
    (0, common_1.Injectable)()
], VictoryService);
exports.VictoryService = VictoryService;
//# sourceMappingURL=victory.service.js.map