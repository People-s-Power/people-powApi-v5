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
import { UserDocument } from 'src/user/entity/user.schema';
import { Petition } from 'src/petition/schema/petition.schema';
import { PostCommentDTO } from './post.dto';
import { organizationDocument } from 'src/organization/schema/organization.schema';
export declare type PostDocument = Post & Document & {
    _doc: any;
};
export declare class Post {
    petition: Record<string, Petition>;
    author: UserDocument;
    org: organizationDocument;
    body: string;
    likes: string[];
    comments: PostCommentDTO[];
    shares: string[];
    isPetition: boolean;
    image: string;
}
export declare const PostSchema: import("mongoose").Schema<Post, import("mongoose").Model<Post, any, any, any, any>, {}, {}, {}, {}, "type", Post>;
