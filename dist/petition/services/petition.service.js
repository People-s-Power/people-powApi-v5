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
exports.PetitionService = exports.ISessionResponseData = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_schema_1 = require("../../notification/notification.schema");
const user_schema_1 = require("../../user/entity/user.schema");
const cloudinary_1 = require("../../utils/cloudinary");
const petition_interface_1 = require("../dto/petition.interface");
const petition_gateway_1 = require("../gateway/petition.gateway");
const petition_schema_1 = require("../schema/petition.schema");
const endorsement_schema_1 = require("../schema/endorsement.schema");
const microservices_1 = require("@nestjs/microservices");
const core_1 = require("@nestjs/core");
class ISessionResponseData {
}
exports.ISessionResponseData = ISessionResponseData;
let PetitionService = class PetitionService {
    constructor(client, userModel, viewModel, PetitionModel, endorsementModel, noticeModel, PetitionGateway, connection, req) {
        this.client = client;
        this.userModel = userModel;
        this.viewModel = viewModel;
        this.PetitionModel = PetitionModel;
        this.endorsementModel = endorsementModel;
        this.noticeModel = noticeModel;
        this.PetitionGateway = PetitionGateway;
        this.connection = connection;
        this.req = req;
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
            const petition = await this.PetitionModel.create(Object.assign(Object.assign({}, data), { authorId: user.id, authorName: user.name, authorImg: user.image || 'No img', excerpt,
                image, slug: data.title.split(" ").join("-").toLowerCase(), numberOfPaidEndorsementCount: 0, numberOfPaidViewsCount: 0, region: user.country }));
            this.PetitionGateway.createdPetition({
                PetitionTitle: petition.title,
                user,
            });
            const users = await this.userModel.find();
            const usersEmails = users.map(user => {
                return { email: user.email, username: user.firstName };
            });
            const allPetitions = await this.PetitionModel.find();
            const mailPayload = {
                users: usersEmails,
                Petition: petition_schema_1.Petition,
                Petitions: allPetitions
            };
            this.client.emit('Petition-created', mailPayload);
            return petition;
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
            const petition = await this.PetitionModel.create(Object.assign(Object.assign({}, data), { excerpt,
                image, slug: data.title.split(" ").join("-"), numberOfPaidEndorsementCount: 0, numberOfPaidViewsCount: 0, region: data.country }));
            this.PetitionGateway.createdPetitionOrg({
                PetitionTitle: petition.title,
                orgName: data.authorName,
                orgId: data.authorId
            });
            const users = await this.userModel.find();
            const usersEmails = users.map(user => {
                return { email: user.email, username: user.firstName };
            });
            const allPetitions = await this.PetitionModel.find();
            const mailPayload = {
                users: usersEmails,
                Petition: petition_schema_1.Petition,
                Petitions: allPetitions
            };
            this.client.emit('Petition-created', mailPayload);
            return petition;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(region, limit) {
        try {
            const petitions = await this.PetitionModel
                .find()
                .sort({ createdAt: -1 })
                .limit(limit)
                .populate('endorsements', 'id')
                .populate('views');
            console.log(petitions);
            return petitions;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllOtherRegions(limit) {
        try {
            const petitions = await this.PetitionModel
                .find()
                .sort({ createdAt: -1 })
                .limit(limit)
                .populate('endorsements', 'id')
                .populate('views');
            return petitions;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllActive(limit) {
        const location = this.req.location;
        const region = location.country_name;
        try {
            const petitions = await this.PetitionModel
                .find({ status: petition_interface_1.PetitionStatusEnum.Active })
                .sort({ createdAt: -1 })
                .populate('endorsements', 'id');
            console.log(petitions);
            const regionCampains = petitions.filter(camp => camp.region === region);
            return regionCampains;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllActiveOtherRegions(region, limit) {
        try {
            const petitions = await this.PetitionModel
                .find({ status: petition_interface_1.PetitionStatusEnum.Active })
                .sort({ createdAt: -1 })
                .populate('endorsements', 'id');
            return petitions;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(slug) {
        try {
            const petitions = await this.PetitionModel
                .findOne({ slug })
                .populate('endorsements');
            return petitions;
        }
        catch (error) {
            throw error;
        }
    }
    async update(data) {
        try {
            const petition = await this.PetitionModel.findOneAndUpdate({ _id: data.id }, data, { new: true });
            return petition;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const petition = await this.PetitionModel.findById(id);
            if (!petition)
                throw new common_1.NotFoundException('Record not found');
            await this.endorsementModel.deleteMany({ Petition: id });
            petition.remove();
            return petition;
        }
        catch (error) {
            throw error;
        }
    }
    async updateSession(id, sessionID) {
        try {
            let petition = await this.PetitionModel.findById(id);
            const session = await this.session(sessionID);
            if (!petition)
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
                if (!petition.views.some((v) => v.sessionId === session.id)) {
                    petition = await this.PetitionModel.findByIdAndUpdate(id, {
                        $addToSet: {
                            views: view.id,
                        },
                    }, { new: true });
                }
            }
            return petition;
        }
        catch (error) {
            throw error;
        }
    }
    async like(petition_id, user) {
        var _a;
        const petition = await this.PetitionModel.findById(petition_id);
        if ((_a = petition === null || petition === void 0 ? void 0 : petition.likes) === null || _a === void 0 ? void 0 : _a.includes(user.id)) {
            return await this.unLike(petition_id, user);
        }
        else {
            try {
                const petition = await this.PetitionModel.findOneAndUpdate({ _id: petition_id }, { $addToSet: { likes: user === null || user === void 0 ? void 0 : user.id } }, { new: true });
                return petition;
            }
            catch (error) {
                throw error;
            }
        }
    }
    async unLike(Petition_id, user) {
        try {
            const petition = await this.PetitionModel.findOneAndUpdate({ _id: Petition_id }, { $pull: { likes: user === null || user === void 0 ? void 0 : user.id } }, { new: true });
            return petition;
        }
        catch (error) {
            throw error;
        }
    }
    async myPetitions(user_id) {
        try {
            const petitions = await this.PetitionModel
                .find({
                authorId: user_id,
            })
                .sort({ createdAt: -1 });
            return petitions;
        }
        catch (error) {
            throw error;
        }
    }
    async approvePetition(Petition_id) {
        let petition = await this.PetitionModel.findById(Petition_id);
        try {
            petition = await this.PetitionModel.findOneAndUpdate({ _id: Petition_id }, {
                $set: {
                    status: petition.status === petition_interface_1.PetitionStatusEnum.Active
                        ? petition_interface_1.PetitionStatusEnum.Pending
                        : petition_interface_1.PetitionStatusEnum.Active,
                },
            }, { new: true });
            return petition;
        }
        catch (error) {
            throw error;
        }
    }
    async viewPetition(id, userId) {
        try {
            const petition = await this.PetitionModel.findById(id);
            const user = await this.userModel.findById(userId);
            if (!petition || !user)
                throw new Error('Not found');
            if (petition.authorId.toString() === userId.toString())
                return 'Author Viewed';
            if (petition.views.includes(userId))
                return 'Viewed';
            const author = await this.userModel.findById(petition.authorId);
            petition.views.push(userId);
            await petition.save();
            return petition;
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
    async feature(Petition_id) {
        let petition = await this.PetitionModel.findById(Petition_id);
        try {
            petition = await this.PetitionModel.findOneAndUpdate({ _id: Petition_id }, { $set: { featured: !petition.featured } });
            return petition;
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
PetitionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MAIL_SERVICE')),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(petition_schema_1.View.name)),
    __param(3, (0, mongoose_1.InjectModel)(petition_schema_1.Petition.name)),
    __param(4, (0, mongoose_1.InjectModel)(endorsement_schema_1.Endorsement.name)),
    __param(5, (0, mongoose_1.InjectModel)(notification_schema_1.Notice.name)),
    __param(7, (0, mongoose_1.InjectConnection)()),
    __param(8, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        petition_gateway_1.PetitionGateway,
        mongoose_2.Connection, Object])
], PetitionService);
exports.PetitionService = PetitionService;
//# sourceMappingURL=petition.service.js.map