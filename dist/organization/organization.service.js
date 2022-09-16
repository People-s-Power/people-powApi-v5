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
const cloudinary_1 = require("../utils/cloudinary");
const organization_schema_1 = require("./schema/organization.schema");
let OrganizationService = class OrganizationService {
    constructor(OrganizationModel) {
        this.OrganizationModel = OrganizationModel;
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
            const image = await (0, cloudinary_1.cloudinaryUpload)(payload.uploadImage).catch((err) => {
                throw err;
            });
            const organization = await this.OrganizationModel.create(Object.assign(Object.assign({}, payload), { image: 'Upload Image', author: user._id, country: user.country, city: user.city }));
            return organization;
        }
        catch (error) {
            throw error;
        }
    }
    async updateOrganization(payload, userId) {
        try {
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
};
OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(organization_schema_1.orgnaization.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrganizationService);
exports.OrganizationService = OrganizationService;
//# sourceMappingURL=organization.service.js.map