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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const user_schema_1 = require("../user/entity/user.schema");
const cloudinary_1 = require("../utils/cloudinary");
let OrgsController = class OrgsController {
    constructor(userModel) {
        this.userModel = userModel;
        this.logger = new common_1.Logger();
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
        return 'Success';
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/uploadimg/:orgId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrgsController.prototype, "uploadImage", null);
OrgsController = __decorate([
    (0, common_1.Controller)('api/v3/organization'),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrgsController);
exports.OrgsController = OrgsController;
//# sourceMappingURL=organization.controller.js.map