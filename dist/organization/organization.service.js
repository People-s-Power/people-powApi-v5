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
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/entity/user.schema");
const organization_schema_1 = require("./schema/organization.schema");
let OrganizationService = class OrganizationService {
    constructor(OrganizationModel, UserModel) {
        this.OrganizationModel = OrganizationModel;
        this.UserModel = UserModel;
    }
    async getOrganizations() {
        const orgs = await this.OrganizationModel.find();
        return orgs;
    }
    async getOrg(id) {
        try {
            const organization = await this.OrganizationModel.findById(id);
            if (!organization) {
                throw new common_1.BadRequestException(`Organization don't exist`);
            }
            return organization;
        }
        catch (error) {
            throw error;
        }
    }
    async userOrgs(id) {
        try {
            const orgs = await this.OrganizationModel.find({ author: id });
            return orgs;
        }
        catch (error) {
            throw error;
        }
    }
    async createOrg(payload, user) {
        try {
            const nameExist = await this.OrganizationModel.findOne({ name: payload.name });
            if (nameExist) {
                throw new common_1.BadRequestException('Name already exists');
            }
            const organization = await this.OrganizationModel.create(Object.assign(Object.assign({}, payload), { image: 'Upload Image', author: user._id, country: user.country, city: user.city }));
            return organization;
        }
        catch (error) {
            throw error;
        }
    }
    async updateOrganization(data, operatorId) {
        try {
            const payload = data === null || data === void 0 ? void 0 : data.input;
            const org = await this.OrganizationModel.findById(payload.orgId);
            if (!org) {
                throw new common_1.BadRequestException(`Organization doesn't exist`);
            }
            const authObj = {
                userId: org.author,
                role: 'Author'
            };
            const operators = org.operators;
            const allowedList = [...operators, authObj];
            console.log(allowedList);
            const isAllowed = allowedList.find(e => e.userId === operatorId.toString());
            if (!isAllowed)
                throw new common_1.UnauthorizedException('Not Allowed');
            await org.set(Object.assign({}, payload));
            await org.save();
            return org;
        }
        catch (error) {
            throw error;
        }
    }
    async updateImage(image, orgId) {
        try {
            const organization = await this.OrganizationModel.findById(orgId);
            if (!organization) {
                throw new common_1.BadRequestException(`Organization doesn't exist`);
            }
            organization.image = image;
            await organization.save();
            return organization;
        }
        catch (error) {
            throw error;
        }
    }
    async createOperator(role, userId, orgId, operatorId) {
        try {
            const org = await this.OrganizationModel.findById(orgId);
            if (!org) {
                throw new common_1.BadRequestException(`Organization doesn't exist`);
            }
            const authObj = {
                userId: org.author,
                role: 'Author'
            };
            const operators = org.operators;
            const allowedList = [...operators, authObj];
            console.log(allowedList);
            const isAllowed = allowedList.find(e => e.userId === operatorId.toString());
            if (!isAllowed)
                throw new common_1.UnauthorizedException('Not Allowed');
            const operatorList = org.operators;
            const alreadyExist = allowedList.find(e => e.userId === userId);
            if (alreadyExist) {
                throw new common_1.BadRequestException('User already added');
            }
            operatorList.push({
                userId: userId,
                role: role
            });
            org.operators = operatorList;
            await org.save();
            const user = await this.UserModel.findById(userId);
            const orgList = user.orgOperating;
            orgList.push(org._id);
            user.orgOperating = orgList;
            await user.save();
            return org;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteOperator(orgId, user, operatorId) {
        try {
            const org = await this.OrganizationModel.findById(orgId);
            if (!org) {
                throw new common_1.BadRequestException(`Organization doesn't exist`);
            }
            if (user._id.toString() !== org.author)
                throw new common_1.UnauthorizedException('Not Allowed');
            const operatorList = org.operators;
            const alreadyExistIndex = operatorList.findIndex(e => e.userId === user._id.toString);
            operatorList.splice(alreadyExistIndex, 1);
            org.operators = operatorList;
            await org.save();
            const orgList = user.orgOperating;
            const orgIndex = orgList.findIndex(e => e === orgId.toString);
            orgList.splice(orgIndex, 1);
            user.orgOperating = orgList;
            await user.save();
            return org;
        }
        catch (error) {
            throw error;
        }
    }
};
OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(organization_schema_1.orgnaization.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], OrganizationService);
exports.OrganizationService = OrganizationService;
//# sourceMappingURL=organization.service.js.map