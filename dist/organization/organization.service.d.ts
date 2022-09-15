import { Model } from 'mongoose';
import { UserDocument } from 'src/user/entity/user.schema';
import { CreateOrgDTO } from './schema/organization.dto';
import { organizationDocument } from './schema/organization.schema';
export declare class OrganizationService {
    private readonly OrganizationModel;
    constructor(OrganizationModel: Model<organizationDocument>);
    getOrganizations(): Promise<organizationDocument[]>;
    createOrg(payload: CreateOrgDTO, user: UserDocument): Promise<organizationDocument>;
}
