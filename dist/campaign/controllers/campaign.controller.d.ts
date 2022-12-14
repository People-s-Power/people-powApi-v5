/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { Request } from 'express';
import { ReqWithUser } from 'src/typings';
import { CreateCampaignDTO, CreateCampaignOrgDTO, UpdateCampaignDTO } from '../dto/campaign.dto';
import { CampaignGateway } from '../gateway/campaign.gateway';
import { CampaignService, ISessionResponseData } from '../services/campaign.service';
import { CampaignDocument } from '../schema/campaign.schema';
export declare class CampaignController {
    private readonly campaignService;
    private readonly campaignGateway;
    constructor(campaignService: CampaignService, campaignGateway: CampaignGateway);
    create(data: CreateCampaignDTO, req: ReqWithUser): Promise<import("../schema/campaign.schema").Campaign>;
    createCampForOrg(data: CreateCampaignOrgDTO, param: any): Promise<import("../schema/campaign.schema").Campaign>;
    getSession(id: string, req: Request): Promise<ISessionResponseData>;
    findAll(): Promise<import("../schema/campaign.schema").Campaign[]>;
    findAllNotice(model: string): Promise<Omit<import("../../notification/notification.schema").Notice & import("mongoose").Document<any, any, any> & {
        _doc: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    findOne(slug: string): Promise<CampaignDocument>;
    myCampaign(req: ReqWithUser): Promise<import("../schema/campaign.schema").Campaign[]>;
    orgCampaign(param: any): Promise<import("../schema/campaign.schema").Campaign[]>;
    update(data: UpdateCampaignDTO): Promise<import("../schema/campaign.schema").Campaign>;
    delete(id: string): Promise<any>;
    like(id: string, req: ReqWithUser): Promise<CampaignDocument>;
    approveCampaign(data: {
        campaign_id: string;
    }): Promise<CampaignDocument>;
    viewCamp(id: string, data: {
        userId: string;
    }): Promise<CampaignDocument | string>;
}
