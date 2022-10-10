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
            _id: import("mongoose").Types.ObjectId;
        };
        Petitions: (import("../petition/schema/petition.schema").Petition & import("mongoose").Document<any, any, any> & {
            _doc: any;
        } & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    seedUsers(): Promise<(Omit<any, keyof User | keyof import("mongoose").Document<any, any, any> | "_doc"> & User & import("mongoose").Document<any, any, any> & {
        _id: any;
        _doc: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
