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
exports.CampaignService = exports.ISessionResponseData = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_schema_1 = require("../../notification/notification.schema");
const user_schema_1 = require("../../user/entity/user.schema");
const cloudinary_1 = require("../../utils/cloudinary");
const campaign_interface_1 = require("../dto/campaign.interface");
const campaign_gateway_1 = require("../gateway/campaign.gateway");
const campaign_schema_1 = require("../schema/campaign.schema");
const endorsement_schema_1 = require("../schema/endorsement.schema");
const microservices_1 = require("@nestjs/microservices");
class ISessionResponseData {
}
exports.ISessionResponseData = ISessionResponseData;
let CampaignService = class CampaignService {
    constructor(client, userModel, viewModel, campaignModel, endorsementModel, noticeModel, campaignGateway, connection) {
        this.client = client;
        this.userModel = userModel;
        this.viewModel = viewModel;
        this.campaignModel = campaignModel;
        this.endorsementModel = endorsementModel;
        this.noticeModel = noticeModel;
        this.campaignGateway = campaignGateway;
        this.connection = connection;
        this.logger = new common_1.Logger();
    }
    async create(data, user) {
        const image = await (0, cloudinary_1.cloudinaryUpload)(data.image).catch((err) => {
            throw err;
        });
        const { body } = data;
        let excerpt;
        if (body) {
            excerpt = body.split(' ').splice(0, 36).join(' ');
        }
        try {
            const campaign = await this.campaignModel.create(Object.assign(Object.assign({}, data), { authorId: user.id, authorName: user.name, authorImg: user.image || 'No img', excerpt,
                image, slug: data.title.split(" ").join("-"), numberOfPaidEndorsementCount: 0, numberOfPaidViewsCount: 0, region: user.country }));
            this.campaignGateway.createdCampaign({
                campaignTitle: campaign.title,
                user,
            });
            const users = await this.userModel.find();
            const usersEmails = users.map(user => {
                return { email: user.email, username: user.firstName };
            });
            const allCampaigns = await this.campaignModel.find();
            const mailPayload = {
                users: usersEmails,
                campaign: campaign,
                campaigns: allCampaigns
            };
            this.client.emit('campaign-created', mailPayload);
            return campaign;
        }
        catch (error) {
            throw error;
        }
    }
    async createForOrg(data) {
        this.logger.log(data);
        const image = await (0, cloudinary_1.cloudinaryUpload)(data.image).catch((err) => {
            throw err;
        });
        const { body } = data;
        let excerpt;
        if (body) {
            excerpt = body.split(' ').splice(0, 36).join(' ');
        }
        try {
            const campaign = await this.campaignModel.create(Object.assign(Object.assign({}, data), { excerpt,
                image, slug: data.title.split(" ").join("-"), numberOfPaidEndorsementCount: 0, numberOfPaidViewsCount: 0, region: data.country }));
            this.campaignGateway.createdCampaignOrg({
                campaignTitle: campaign.title,
                orgName: data.authorName,
                orgId: data.authorId
            });
            const users = await this.userModel.find();
            const usersEmails = users.map(user => {
                return { email: user.email, username: user.firstName };
            });
            const allCampaigns = await this.campaignModel.find();
            const mailPayload = {
                users: usersEmails,
                campaign: campaign,
                campaigns: allCampaigns
            };
            this.client.emit('campaign-created', mailPayload);
            return campaign;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(region, limit) {
        try {
            const campaigns = await this.campaignModel
                .find({ region: region })
                .sort({ createdAt: -1 })
                .limit(limit)
                .populate('endorsements', 'id')
                .populate('views');
            return campaigns;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllOtherRegions(limit) {
        try {
            const campaigns = await this.campaignModel
                .find()
                .sort({ createdAt: -1 })
                .limit(limit)
                .populate('endorsements', 'id')
                .populate('views');
            return campaigns;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllActive(region, limit) {
        try {
            const campaigns = await this.campaignModel
                .find({ status: campaign_interface_1.CampaignStatusEnum.Active })
                .sort({ createdAt: -1 })
                .populate('endorsements', 'id');
            const regionCampains = campaigns.filter(camp => camp.region === region);
            return regionCampains;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllActiveOtherRegions(region, limit) {
        try {
            const campaigns = await this.campaignModel
                .find({ status: campaign_interface_1.CampaignStatusEnum.Active })
                .sort({ createdAt: -1 })
                .populate('endorsements', 'id');
            return campaigns;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(slug) {
        try {
            const campaigns = await this.campaignModel
                .findOne({ slug })
                .populate('endorsements');
            return campaigns;
        }
        catch (error) {
            throw error;
        }
    }
    async update(data) {
        try {
            const campaign = await this.campaignModel.findOneAndUpdate({ _id: data.id }, data, { new: true });
            return campaign;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const campaign = await this.campaignModel.findById(id);
            if (!campaign)
                throw new common_1.NotFoundException('Record not found');
            await this.endorsementModel.deleteMany({ campaign: id });
            campaign.remove();
            return campaign;
        }
        catch (error) {
            throw error;
        }
    }
    async updateSession(id, sessionID) {
        try {
            let campaign = await this.campaignModel.findById(id);
            const session = await this.session(sessionID);
            if (!campaign)
                throw new common_1.NotFoundException();
            let view = await this.connection.models.View.findOne({
                sessionId: session.id,
            });
            if (!view) {
                view = await this.connection.models.View.create({
                    sessionId: session.id,
                    country: session.location.country_name,
                    user: session === null || session === void 0 ? void 0 : session.user,
                });
            }
            else {
                if (!campaign.views.some((v) => v.sessionId === session.id)) {
                    campaign = await this.campaignModel.findByIdAndUpdate(id, {
                        $addToSet: {
                            views: view.id,
                        },
                    }, { new: true });
                }
            }
            return campaign;
        }
        catch (error) {
            throw error;
        }
    }
    async like(campaign_id, user) {
        var _a;
        const campaign = await this.campaignModel.findById(campaign_id);
        if ((_a = campaign === null || campaign === void 0 ? void 0 : campaign.likes) === null || _a === void 0 ? void 0 : _a.includes(user.id)) {
            return await this.unLike(campaign_id, user);
        }
        else {
            try {
                const campaign = await this.campaignModel.findOneAndUpdate({ _id: campaign_id }, { $addToSet: { likes: user === null || user === void 0 ? void 0 : user.id } }, { new: true });
                return campaign;
            }
            catch (error) {
                throw error;
            }
        }
    }
    async unLike(campaign_id, user) {
        try {
            const campaign = await this.campaignModel.findOneAndUpdate({ _id: campaign_id }, { $pull: { likes: user === null || user === void 0 ? void 0 : user.id } }, { new: true });
            return campaign;
        }
        catch (error) {
            throw error;
        }
    }
    async myCampaigns(user_id) {
        try {
            const campaigns = await this.campaignModel
                .find({
                authorId: user_id,
            })
                .sort({ createdAt: -1 });
            return campaigns;
        }
        catch (error) {
            throw error;
        }
    }
    async approveCampaign(campaign_id) {
        let campaign = await this.campaignModel.findById(campaign_id);
        try {
            campaign = await this.campaignModel.findOneAndUpdate({ _id: campaign_id }, {
                $set: {
                    status: campaign.status === campaign_interface_1.CampaignStatusEnum.Active
                        ? campaign_interface_1.CampaignStatusEnum.Pending
                        : campaign_interface_1.CampaignStatusEnum.Active,
                },
            }, { new: true });
            return campaign;
        }
        catch (error) {
            throw error;
        }
    }
    async viewCampaign(id, userId) {
        try {
            const campaign = await this.campaignModel.findById(id);
            const user = await this.userModel.findById(userId);
            if (!campaign || !user)
                throw new Error('Not found');
            if (campaign.authorId.toString() === userId.toString())
                return 'Author Viewed';
            if (campaign.views.includes(userId))
                return 'Viewed';
            const author = await this.userModel.findById(campaign.authorId);
            campaign.views.push(userId);
            await campaign.save();
            return campaign;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async findAllNotice(model) {
        try {
            if (model) {
                const notifications = await this.noticeModel
                    .find({
                    db_model: model,
                })
                    .populate({
                    path: 'user',
                    select: 'id image firstName lastName',
                })
                    .sort({ createdAt: -1 });
                return notifications;
            }
            else {
                const notifications = await this.noticeModel
                    .find({})
                    .populate({
                    path: 'user',
                    select: 'id image firstName lastName',
                })
                    .sort({ createdAt: -1 });
                return notifications;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async feature(campaign_id) {
        let campaign = await this.campaignModel.findById(campaign_id);
        try {
            campaign = await this.campaignModel.findOneAndUpdate({ _id: campaign_id }, { $set: { featured: !campaign.featured } });
            return campaign;
        }
        catch (error) {
            throw error;
        }
    }
    async session(_id) {
        try {
            const data = await this.connection.db
                .collection('sessions')
                .findOne({ _id });
            if (!data)
                throw new common_1.NotFoundException();
            const result = JSON.parse(data.session);
            return {
                id: data._id,
                user: result.passport.user.id,
                location: result.location,
            };
        }
        catch (error) {
            throw error;
        }
    }
};
CampaignService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MAIL_SERVICE')),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(campaign_schema_1.View.name)),
    __param(3, (0, mongoose_1.InjectModel)(campaign_schema_1.Campaign.name)),
    __param(4, (0, mongoose_1.InjectModel)(endorsement_schema_1.Endorsement.name)),
    __param(5, (0, mongoose_1.InjectModel)(notification_schema_1.Notice.name)),
    __param(7, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        campaign_gateway_1.CampaignGateway,
        mongoose_2.Connection])
], CampaignService);
exports.CampaignService = CampaignService;
//# sourceMappingURL=campaign.service.js.map