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
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from 'src/campaign/schema/campaign.schema';
import { AccountTypeEnum, AssignUserAdminDTO, ChangeUserAccountTypeDTO, ChangeUserRoleDTO, StaffRoleEnum, UpdateUserDTO } from '../dto/user.dto';
import { User, UserDocument } from '../entity/user.schema';
export declare class UserService {
    private readonly cacheManager;
    private readonly userModel;
    private readonly campaignModel;
    constructor(cacheManager: Cache, userModel: Model<UserDocument>, campaignModel: Model<CampaignDocument>);
    getUsers(accountType?: AccountTypeEnum, role?: StaffRoleEnum, user?: UserDocument): Promise<UserDocument[]>;
    findOne(id: string): Promise<{
        user: User & import("mongoose").Document<any, any, any> & {
            _id: any;
            _doc: any;
        } & {
            _id: import("mongoose").Types.ObjectId;
        };
        campaigns: (Campaign & import("mongoose").Document<any, any, any> & {
            _doc: any;
        } & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    uploadProfileImage(data: {
        image: string;
        id: string;
    }): Promise<UserDocument>;
    delete(id: any): Promise<UserDocument>;
    deleteMany(): Promise<UserDocument[]>;
    assignUser(data: AssignUserAdminDTO): Promise<UserDocument>;
    changeRole(data: ChangeUserRoleDTO): Promise<UserDocument>;
    accountType(data: ChangeUserAccountTypeDTO): Promise<UserDocument>;
    updateUser(data: UpdateUserDTO): Promise<UserDocument>;
    uploadImage(file: string, user: UserDocument): Promise<UserDocument>;
    activateUser(user_id: any): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
        _doc: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    blockUser(user_id: any): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
        _doc: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    seedUsers(): Promise<(Omit<any, keyof User | keyof import("mongoose").Document<any, any, any> | "_doc"> & User & import("mongoose").Document<any, any, any> & {
        _id: any;
        _doc: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
