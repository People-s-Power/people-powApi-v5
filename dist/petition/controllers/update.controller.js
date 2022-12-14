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
exports.UpdateController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const update_service_1 = require("../services/update.service");
let UpdateController = class UpdateController {
    constructor(updateService) {
        this.updateService = updateService;
    }
    addUpdate(data, req) {
        const { petitionId, body, image, authorId } = data;
        return this.updateService.addUpdates(petitionId, body, image, authorId);
    }
    getCampUpdates(param) {
        const { petitionId } = param;
        return this.updateService.getPetitionUpdates(petitionId);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UpdateController.prototype, "addUpdate", null);
__decorate([
    (0, common_1.Get)('/:petitionId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UpdateController.prototype, "getCampUpdates", null);
UpdateController = __decorate([
    (0, common_1.Controller)('api/v3/petition/update'),
    __metadata("design:paramtypes", [update_service_1.UpdateService])
], UpdateController);
exports.UpdateController = UpdateController;
//# sourceMappingURL=update.controller.js.map