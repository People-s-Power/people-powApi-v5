/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indizes" />
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
import { Logger } from '@nestjs/common';
import { Connection, Model, ObjectId } from 'mongoose';
import { IGeo } from 'src/interfaces';
import { Notice, NoticeDocument } from 'src/notification/notification.schema';
import { UserDocument } from 'src/user/entity/user.schema';
import { CreateCampaignDTO, CreateCampaignOrgDTO, UpdateCampaignDTO } from '../dto/campaign.dto';
import { CampaignGateway } from '../gateway/campaign.gateway';
import { Campaign, CampaignDocument, ViewDocument } from '../schema/campaign.schema';
import { Endorsement } from '../schema/endorsement.schema';
import { ClientProxy } from '@nestjs/microservices';
export declare class ISessionResponseData {
    id: any;
    user: string;
    location: IGeo;
}
export declare class CampaignService {
    private client;
    private readonly userModel;
    private viewModel;
    private readonly campaignModel;
    private readonly endorsementModel;
    private readonly noticeModel;
    private campaignGateway;
    private connection;
    logger: Logger;
    constructor(client: ClientProxy, userModel: Model<UserDocument>, viewModel: Model<ViewDocument>, campaignModel: Model<CampaignDocument>, endorsementModel: Model<Endorsement>, noticeModel: Model<NoticeDocument>, campaignGateway: CampaignGateway, connection: Connection);
    create(data: CreateCampaignDTO, user: UserDocument): Promise<Campaign>;
    createForOrg(data: CreateCampaignOrgDTO): Promise<Campaign>;
    findAll(region?: string, limit?: number): Promise<Campaign[]>;
    findAllOtherRegions(limit?: number): Promise<Campaign[]>;
    findAllActive(region: string, limit?: number): Promise<Campaign[]>;
    findAllActiveOtherRegions(region: string, limit?: number): Promise<Campaign[]>;
    findOne(slug: string): Promise<CampaignDocument>;
    update(data: Partial<UpdateCampaignDTO>): Promise<Campaign>;
    delete(id: string): Promise<CampaignDocument>;
    updateSession(id: string, sessionID: string): Promise<CampaignDocument>;
    like(campaign_id: string, user: UserDocument): Promise<CampaignDocument>;
    unLike(campaign_id: string, user: UserDocument): Promise<CampaignDocument>;
    myCampaigns(user_id: string): Promise<Campaign[]>;
    approveCampaign(campaign_id: string): Promise<CampaignDocument>;
    viewCampaign(id: string, userId: string): Promise<CampaignDocument | string>;
    findAllNotice(model?: string): Promise<Omit<Notice & import("mongoose").Document<any, any, any> & {
        _doc: any;
    } & {
        _id: any;
    }, never>[]>;
    feature(campaign_id: ObjectId): Promise<CampaignDocument>;
    session(_id: string): Promise<ISessionResponseData>;
}
