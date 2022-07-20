import { ApplicantService } from 'src/applicant/services/applicant.service';
import { AccountTypeEnum, StaffRoleEnum } from './dto/user.dto';
import { User, UserDocument } from './entity/user.schema';
import { UserService } from './services/user.service';
export declare class UserResolver {
    private readonly userService;
    private readonly applicantService;
    constructor(userService: UserService, applicantService: ApplicantService);
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
    getUserApplicants(id: string): Promise<import("../applicant/schema/applicant.shema").ApplicantDocument[]>;
    seedUsers(): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
        _doc: any;
    } & {
        _id: any;
    })[]>;
}
