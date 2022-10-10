import { OnGatewayConnection, OnGatewayInit } from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Notice, NoticeDocument } from 'src/notification/notification.schema';
import { UserDocument } from 'src/user/entity/user.schema';
import { Server } from 'ws';
import { PetitionDocument } from '../schema/petition.schema';
export declare class PetitionGateway implements OnGatewayConnection, OnGatewayInit {
    private noticeModel;
    private readonly PetitionModel;
    constructor(noticeModel: Model<NoticeDocument>, PetitionModel: Model<PetitionDocument>);
    server: Server;
    handleConnection(): void;
    afterInit(server: Server): void;
    createdPetition(data: {
        PetitionTitle: string;
        user: UserDocument;
    }): Promise<Notice & import("mongoose").Document<any, any, any> & {
        _doc: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createdPetitionOrg(data: {
        PetitionTitle: string;
        orgName: string;
        orgId: string;
    }): Promise<Notice & import("mongoose").Document<any, any, any> & {
        _doc: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    endorsedPetition(data: {
        petitionTitle: string;
        user: UserDocument;
    }): Promise<Notice & import("mongoose").Document<any, any, any> & {
        _doc: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getPetitionNotice(): Promise<any>;
    getAllNotice(model?: string): Promise<any>;
}
