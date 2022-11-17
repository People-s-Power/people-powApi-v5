import { Logger } from '@nestjs/common';
import { Connection, Model, ObjectId } from 'mongoose';
import { IGeo } from 'src/interfaces';
import { Notice, NoticeDocument } from 'src/notification/notification.schema';
import { UserDocument } from 'src/user/entity/user.schema';
import { CreatePetitionDTO, CreatePetitionOrgDTO, UpdatePetitionDTO } from '../dto/petition.dto';
import { PetitionGateway } from '../gateway/petition.gateway';
import { Petition, PetitionDocument, ViewDocument } from '../schema/petition.schema';
import { Endorsement } from '../schema/endorsement.schema';
import { ClientProxy } from '@nestjs/microservices';
import { ReqWithUser } from 'src/typings';
export declare class ISessionResponseData {
    id: any;
    user: string;
    location: IGeo;
}
export declare class PetitionService {
    private client;
    private readonly userModel;
    private viewModel;
    private readonly PetitionModel;
    private readonly endorsementModel;
    private readonly noticeModel;
    private PetitionGateway;
    private connection;
    private readonly req;
    logger: Logger;
    constructor(client: ClientProxy, userModel: Model<UserDocument>, viewModel: Model<ViewDocument>, PetitionModel: Model<PetitionDocument>, endorsementModel: Model<Endorsement>, noticeModel: Model<NoticeDocument>, PetitionGateway: PetitionGateway, connection: Connection, req: ReqWithUser | any);
    create(data: CreatePetitionDTO, user: UserDocument): Promise<Petition>;
    createForOrg(data: CreatePetitionOrgDTO): Promise<Petition>;
    findAll(region?: string, limit?: number): Promise<Petition[]>;
    findAllOtherRegions(limit?: number): Promise<Petition[]>;
    findAllActive(limit?: number): Promise<Petition[]>;
    findAllActiveOtherRegions(region: string, limit?: number): Promise<Petition[]>;
    findOne(slug: string): Promise<PetitionDocument>;
    update(data: Partial<UpdatePetitionDTO>): Promise<Petition>;
    delete(id: string): Promise<PetitionDocument>;
    updateSession(id: string, sessionID: string): Promise<PetitionDocument>;
    like(petition_id: string, user: UserDocument): Promise<PetitionDocument>;
    unLike(Petition_id: string, user: UserDocument): Promise<PetitionDocument>;
    myPetitions(user_id: string): Promise<Petition[]>;
    approvePetition(Petition_id: string): Promise<PetitionDocument>;
    viewPetition(id: string, userId: string): Promise<PetitionDocument | string>;
    findAllNotice(model?: string): Promise<Omit<Notice & import("mongoose").Document<any, any, any> & {
        _doc: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    feature(Petition_id: ObjectId): Promise<PetitionDocument>;
    session(_id: string): Promise<ISessionResponseData>;
}
