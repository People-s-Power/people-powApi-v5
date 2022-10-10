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
exports.ReportCampSchema = exports.ReportCamp = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const reportCamp_dto_1 = require("./reportCamp.dto");
let ReportCamp = class ReportCamp extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ReportCamp.prototype, "campaignSlug", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
        enum: reportCamp_dto_1.ReportEnum,
        default: reportCamp_dto_1.ReportEnum.Harmful
    }),
    __metadata("design:type", String)
], ReportCamp.prototype, "reportCampType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ReportCamp.prototype, "reportCampMessage", void 0);
ReportCamp = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], ReportCamp);
exports.ReportCamp = ReportCamp;
exports.ReportCampSchema = mongoose_1.SchemaFactory.createForClass(ReportCamp);
//# sourceMappingURL=reportCamp.schema.js.map