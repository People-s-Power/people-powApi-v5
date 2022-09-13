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
exports.ReportCampService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const reportCamp_schema_1 = require("../schema/reportCamp.schema");
let ReportCampService = class ReportCampService {
    constructor(configService, reportModel) {
        this.configService = configService;
        this.reportModel = reportModel;
    }
    async getAllReports() {
        const reports = await this.reportModel.find();
        return reports;
    }
    async createReport(data) {
        try {
            const report = await this.reportModel.create({
                campaignSlug: data.campaignSlug,
                reportType: data.reportType,
                reportCampMessage: data.reportCampMessage
            });
            return report;
        }
        catch (error) {
            throw error;
        }
    }
    async resolveReport(reportId) {
        const report = await this.reportModel.deleteOne({ _id: reportId });
        return report;
    }
    async getReports(slug) {
        const campReports = await this.reportModel.find({ campaignSlug: slug });
        return campReports;
    }
};
ReportCampService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(reportCamp_schema_1.ReportCamp.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model])
], ReportCampService);
exports.ReportCampService = ReportCampService;
//# sourceMappingURL=reportCamp.service.js.map