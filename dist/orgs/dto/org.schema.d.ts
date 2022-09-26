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
import { Document } from 'mongoose';
export declare type OrgDocument = Org & Document & {
    _id: any;
    _doc: any;
};
export declare class Org {
    author: string;
    name: string;
    email: string;
    description: string;
    phone: string;
    followers: string[];
    following: string[];
    followersCount: number;
    followingCount: number;
    operators: [];
    facebook: string;
    linkedIn: string;
    instagram: string;
    twitter: string;
    country: string;
    city: string;
}
export declare const OrgSchema: import("mongoose").Schema<Org, import("mongoose").Model<Org, any, any, any, any>, {}, {}, {}, {}, "type", Org>;
