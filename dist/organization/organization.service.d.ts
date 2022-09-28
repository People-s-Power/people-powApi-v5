import { Model } from 'mongoose';
import { UserDocument } from 'src/user/entity/user.schema';
import { CreateOrgDTO, StaffRoleEnum } from './schema/organization.dto';
import { organizationDocument, orgnaization } from './schema/organization.schema';
export declare class OrganizationService {
    private readonly OrganizationModel;
    private readonly UserModel;
    constructor(OrganizationModel: Model<organizationDocument>, UserModel: Model<UserDocument>);
    getOrganizations(): Promise<organizationDocument[]>;
    getOrg(id: string): Promise<organizationDocument>;
    userOrgs(id: string): Promise<(orgnaization & import("mongoose").Document<any, any, any> & {
        _id: any;
        _doc: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    createOrg(payload: CreateOrgDTO, user: UserDocument): Promise<organizationDocument>;
    updateOrganization(data: any, operatorId: any): Promise<orgnaization & import("mongoose").Document<any, any, any> & {
        _id: any;
        _doc: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateImage(image: any, orgId: any): Promise<organizationDocument>;
    createOperator(role: StaffRoleEnum, userId: any, orgId: any, operatorId: any): Promise<orgnaization & import("mongoose").Document<any, any, any> & {
        _id: any;
        _doc: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteOperator(orgId: any, user: any, operatorId: any): Promise<orgnaization & import("mongoose").Document<any, any, any> & {
        _id: any;
        _doc: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
