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
exports.UpdateService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cloudinary_1 = require("../../utils/cloudinary");
const update_schema_1 = require("../schema/update.schema");
let UpdateService = class UpdateService {
    constructor(UpdateModel) {
        this.UpdateModel = UpdateModel;
    }
    async addUpdates(petitionId, body, img) {
        const image = await (0, cloudinary_1.cloudinaryUpload)(img).catch((err) => {
            throw err;
        });
        const update = await this.UpdateModel.create({
            petition: petitionId,
            body: body,
            image
        });
        await update.save();
        return update;
    }
    async getPetitionUpdates(petitionId) {
        const updates = await this.UpdateModel.find({ petition: petitionId });
        return updates;
    }
};
UpdateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(update_schema_1.Update.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UpdateService);
exports.UpdateService = UpdateService;
//# sourceMappingURL=update.service.js.map