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
exports.IEndorsement = exports.LikeEndorsementDTO = exports.UpdateEndorsementDTO = exports.CreateEndorsementDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
class CreateEndorsementDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateEndorsementDTO.prototype, "petition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateEndorsementDTO.prototype, "body", void 0);
exports.CreateEndorsementDTO = CreateEndorsementDTO;
class UpdateEndorsementDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateEndorsementDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateEndorsementDTO.prototype, "body", void 0);
exports.UpdateEndorsementDTO = UpdateEndorsementDTO;
class LikeEndorsementDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LikeEndorsementDTO.prototype, "id", void 0);
exports.LikeEndorsementDTO = LikeEndorsementDTO;
class IEndorsement extends mongoose_1.Document {
}
exports.IEndorsement = IEndorsement;
//# sourceMappingURL=endorsement.dto.js.map