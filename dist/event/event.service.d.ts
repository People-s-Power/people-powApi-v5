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
import { Model } from 'mongoose';
import { organizationDocument } from 'src/organization/schema/organization.schema';
import { UserDocument } from 'src/user/entity/user.schema';
import { EventDocument } from './schema/event';
import { EventInput } from './schema/event.dto';
export declare class EventService {
    private readonly eventModel;
    private readonly userModel;
    private readonly orgModel;
    constructor(eventModel: Model<EventDocument>, userModel: Model<UserDocument>, orgModel: Model<organizationDocument>);
    findAll(page?: number, limit?: number, filter?: string): Promise<any[]>;
    create(data: EventInput, user: any): Promise<any>;
    update(data: EventInput, eventId: any, authorId: any): Promise<any>;
    remove(eventId: any, authorId: any): Promise<import("mongoose").Document<unknown, any, EventDocument> & import("./schema/event.dto").IEvent & Document & {
        _id: any;
        _doc: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
