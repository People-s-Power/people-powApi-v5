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
/// <reference types="mongoose" />
import { AccountTypeEnum, StaffRoleEnum } from './dto/user.dto';
import { User, UserDocument } from './entity/user.schema';
import { UserService } from './services/user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(user: UserDocument, role: StaffRoleEnum, accountType: AccountTypeEnum): Promise<UserDocument[]>;
    deleteUser(id: string): Promise<User>;
    deleteManyUser(): Promise<UserDocument[]>;
    getUser(id: string): Promise<{
        user: User & import("mongoose").Document<any, any, any> & {
            _id: any;
            _doc: any;
        } & {
            _id: any;
        };
        campaigns: (import("../campaign/schema/campaign.schema").Campaign & import("mongoose").Document<any, any, any> & {
            _doc: any;
        } & {
            _id: any;
        })[];
    }>;
    seedUsers(): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
        _doc: any;
    } & {
        _id: any;
    })[]>;
}
