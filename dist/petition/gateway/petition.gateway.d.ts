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
/// <reference types="mongoose/types/inferschematype" />
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
