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
const rxjs_1 = require("rxjs");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const user_schema_1 = require("../user/entity/user.schema");
const cloudinary_1 = require("../utils/cloudinary");
const org_dto_1 = require("./dto/org.dto");
let OrgsController = class OrgsController {
    constructor(client, userModel) {
        this.client = client;
        this.userModel = userModel;
        this.logger = new common_1.Logger();
    }
    async createOrg(req, data) {
        const user = req.user;
        user.createdOrg = true;
        await user.save();
        const payload = Object.assign(Object.assign({}, data), { country: user.country, city: user.city, author: user._id });
        this.client.emit('create-org', payload);
        return 'sucess';
    }
    getOrgs() {
        const pattern = { cmd: 'getOrgs' };
        return this.client.send(pattern, 'getorgs');
    }
    getOrg(param) {
        const { orgId } = param;
        const pattern = { cmd: 'getOrg' };
        return this.client.send(pattern, orgId);
    }
    getUserOrg(req) {
        const { user } = req;
        const author = user._id;
        const pattern = { cmd: 'user-orgs' };
        const userOrgs = this.client.send(pattern, author);
        console.log(userOrgs);
        this.logger.log(userOrgs);
        return userOrgs;
    }
    async uploadImage(data, param) {
        const image = await (0, cloudinary_1.cloudinaryUpload)(data.image).catch((err) => {
            console.log(err);
            throw new Error('Problem with uploading image');
        });
        const payload = {
            img: image,
            orgId: param.orgId
        };
        this.client.emit('upload-image', payload);
        return 'Success';
    }
    async updateOrg(data, param) {
        const { orgId } = param;
        const payload = Object.assign(Object.assign({}, data), { orgId });
        this.client.emit('update-org', payload);
        return 'Success';
    }
    follow(body, req) {
        const { orgId } = body;
        const { _id } = req.user;
        const payload = {
            _id, orgId
        };
        this.client.emit('follow-org', payload);
        return 'Success';
    }
    unfollow(body, req) {
        const { orgId } = body;
        const { _id } = req.user;
        const payload = {
            _id, orgId
        };
        this.client.emit('unfollow-org', payload);
        return 'Success';
    }
    async createOperator(data) {
        const Idata = data;
        const { userId, orgId } = Idata;
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.BadRequestException(`User don't exists`);
        user.orgOperating.push(orgId);
        await user.save();
        this.client.emit('create-operator', Idata);
    }
    async updateOperator(data) {
        const Idata = data;
        const { userId, orgId, role } = Idata;
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.BadRequestException(`User don't exists`);
        this.client.emit('update-operator', Idata);
    }
    async deleteOperator(data) {
        const { userId, orgId } = data;
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.BadRequestException(`User don't exists`);
        const orgIndex = user.orgOperating.findIndex(item => item === userId);
        user.orgOperating.splice(orgIndex, 1);
        await user.save();
        this.client.emit('delete-operator', data);
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
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], OrgsController.prototype, "getOrgs", null);
__decorate([
    (0, common_1.Get)('/:orgId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], OrgsController.prototype, "getOrg", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/user/orgs'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], OrgsController.prototype, "getUserOrg", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/uploadimg/:orgId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrgsController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/:orgId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [org_dto_1.UpdateOrgDTO, Object]),
    __metadata("design:returntype", Promise)
], OrgsController.prototype, "updateOrg", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/follow'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrgsController.prototype, "follow", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/unfollow'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrgsController.prototype, "unfollow", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/operator'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [org_dto_1.createOperator]),
    __metadata("design:returntype", Promise)
], OrgsController.prototype, "createOperator", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/operator'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [org_dto_1.createOperator]),
    __metadata("design:returntype", Promise)
], OrgsController.prototype, "updateOperator", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/operator'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrgsController.prototype, "deleteOperator", null);
OrgsController = __decorate([
    (0, common_1.Controller)('api/v3/orgs'),
    __param(0, (0, common_1.Inject)('ORG_SERVICE')),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        mongoose_2.Model])
], OrgsController);
exports.OrgsController = OrgsController;
//# sourceMappingURL=orgs.controller.js.map