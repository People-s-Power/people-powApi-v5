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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignGateway = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const websockets_1 = require("@nestjs/websockets");
const mongoose_2 = require("mongoose");
const local_guard_1 = require("../../auth/guards/local.guard");
const notification_schema_1 = require("../../notification/notification.schema");
const ws_1 = require("ws");
const campaign_interface_1 = require("../dto/campaign.interface");
const campaign_schema_1 = require("../schema/campaign.schema");
let CampaignGateway = class CampaignGateway {
    constructor(noticeModel, campaignModel) {
        this.noticeModel = noticeModel;
        this.campaignModel = campaignModel;
    }
    handleConnection() {
        this.getCampaignNotice();
    }
    afterInit(server) {
        this.server = server;
        this.getCampaignNotice();
    }
    async createdCampaign(data) {
        var _a, _b, _c;
        const notice = await this.noticeModel.create({
            event: campaign_interface_1.CampaignSocketEnum.Created,
            message: `${(_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.firstName} ${(_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.lastName} created a campaign ${data.campaignTitle} `,
            user: (_c = data === null || data === void 0 ? void 0 : data.user) === null || _c === void 0 ? void 0 : _c.id,
            db_model: 'campaign',
        });
        this.getCampaignNotice();
        return notice;
    }
    async createdCampaignOrg(data) {
        const notice = await this.noticeModel.create({
            event: campaign_interface_1.CampaignSocketEnum.Created,
            message: `${data === null || data === void 0 ? void 0 : data.orgName} created a campaign ${data.campaignTitle} `,
            user: data === null || data === void 0 ? void 0 : data.orgId,
            db_model: 'campaign',
        });
        this.getCampaignNotice();
        return notice;
    }
    async endorsedCampaign(data) {
        var _a, _b, _c;
        const notice = await this.noticeModel.create({
            event: campaign_interface_1.CampaignSocketEnum.Created,
            message: `${(_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.firstName} ${(_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.lastName} endorsed a campaign ${data.campaignTitle}`,
            user: (_c = data === null || data === void 0 ? void 0 : data.user) === null || _c === void 0 ? void 0 : _c.id,
            db_model: 'campaign',
        });
        this.getCampaignNotice();
        return notice;
    }
    async getCampaignNotice() {
        const campaigns = await this.noticeModel
            .find({ db_model: 'campaign' })
            .sort({ createdAt: -1 });
        return this.server.emit(campaign_interface_1.CampaignSocketEnum.Get, campaigns);
    }
    async getAllNotice(model) {
        if (!model) {
            const notices = await this.noticeModel
                .find()
                .sort({ createdAt: -1 });
            return this.server.emit('all', notices);
        }
        else {
            const notices = await this.noticeModel
                .find({ db_model: model })
                .sort({ createdAt: -1 });
            return this.server.emit('all', notices);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof ws_1.Server !== "undefined" && ws_1.Server) === "function" ? _a : Object)
], CampaignGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(local_guard_1.WsGuard),
    (0, websockets_1.SubscribeMessage)(campaign_interface_1.CampaignSocketEnum.Created),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaignGateway.prototype, "createdCampaign", null);
__decorate([
    (0, common_1.UseGuards)(local_guard_1.WsGuard),
    (0, websockets_1.SubscribeMessage)(campaign_interface_1.CampaignSocketEnum.Created),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaignGateway.prototype, "createdCampaignOrg", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(campaign_interface_1.CampaignSocketEnum.Endorsed),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaignGateway.prototype, "endorsedCampaign", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(campaign_interface_1.CampaignSocketEnum.Get),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CampaignGateway.prototype, "getCampaignNotice", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(campaign_interface_1.CampaignSocketEnum.Get),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignGateway.prototype, "getAllNotice", null);
CampaignGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __param(0, (0, mongoose_1.InjectModel)(notification_schema_1.Notice.name)),
    __param(1, (0, mongoose_1.InjectModel)(campaign_schema_1.Campaign.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CampaignGateway);
exports.CampaignGateway = CampaignGateway;
//# sourceMappingURL=campaign.gateway.js.map