import { UserDocument } from 'src/user/entity/user.schema';
import { OrganizationService } from './organization.service';
import { organizationDocument } from './schema/organization.schema';
export declare class OrganizationResolver {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    getOrganzations(): Promise<organizationDocument[]>;
    getOrganzation(Id: any): Promise<organizationDocument>;
    getUserOrganizations(Id: any): Promise<organizationDocument[]>;
    createOrg(payload: any, user: UserDocument): Promise<organizationDocument>;
    addOperator(payload: any, user: UserDocument): Promise<import("./schema/organization.schema").orgnaization & import("mongoose").Document<any, any, any> & {
        _id: any;
        _doc: any;
    } & {
        _id: any;
    }>;
}
