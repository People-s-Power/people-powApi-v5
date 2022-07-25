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
exports.OrgsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const user_schema_1 = require("../user/entity/user.schema");
const org_dto_1 = require("./dto/org.dto");
let OrgsController = class OrgsController {
    constructor(client, userModel) {
        this.client = client;
        this.userModel = userModel;
    }
    async createOrg(req, data) {
        const user = req.user;
        if (user.createdOrg)
            throw new common_1.BadRequestException(`User already has an organsation`);
        user.createdOrg = true;
        await user.save();
        const payload = Object.assign(Object.assign({}, data), { country: user.country, city: user.city, author: user._id });
        this.client.emit('create-org', payload);
        return 'sucess';
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, org_dto_1.CreateOrgDTO]),
    __metadata("design:returntype", Promise)
], OrgsController.prototype, "createOrg", null);
OrgsController = __decorate([
    (0, common_1.Controller)('api/v3/orgs'),
    __param(0, (0, common_1.Inject)('ORG_SERVICE')),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        mongoose_2.Model])
], OrgsController);
exports.OrgsController = OrgsController;
//# sourceMappingURL=orgs.controller.js.map