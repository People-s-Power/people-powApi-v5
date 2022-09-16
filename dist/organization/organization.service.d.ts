import { Model } from 'mongoose';
import { UserDocument } from 'src/user/entity/user.schema';
import { CreateOrgDTO } from './schema/organization.dto';
import { organizationDocument, orgnaization } from './schema/organization.schema';
export declare class OrganizationService {
    private readonly OrganizationModel;
    constructor(OrganizationModel: Model<organizationDocument>);
    getOrganizations(): Promise<organizationDocument[]>;
    getOrg(id: string): Promise<organizationDocument>;
    userOrgs(id: string): Promise<(orgnaization & import("mongoose").Document<any, any, any> & {
        _id: any;
        _doc: any;
    } & {
        _id: any;
    })[]>;
    createOrg(payload: CreateOrgDTO, user: UserDocument): Promise<organizationDocument>;
    updateOrganization(payload: any, userId: any): Promise<void>;
    updateImage(uploadedImg: any, orgId: any): Promise<organizationDocument>;
}
