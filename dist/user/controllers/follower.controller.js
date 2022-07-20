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
exports.FollowerController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const follower_service_1 = require("../services/follower.service");
let FollowerController = class FollowerController {
    constructor(followerService) {
        this.followerService = followerService;
    }
    follow() {
        return this.followerService.addFollowers();
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FollowerController.prototype, "follow", null);
FollowerController = __decorate([
    (0, common_1.Controller)('api/v3/followers'),
    __metadata("design:paramtypes", [follower_service_1.FollowersService])
], FollowerController);
exports.FollowerController = FollowerController;
//# sourceMappingURL=follower.controller.js.map