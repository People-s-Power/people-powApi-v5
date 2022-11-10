import { Model } from 'mongoose';
import { organizationDocument } from 'src/organization/schema/organization.schema';
import { UserDocument } from 'src/user/entity/user.schema';
import { AdvertDocument } from './schema/advert';
import { CreateAdvertDTO } from './schema/advert.dto';
export declare class AdvertService {
    private readonly advertModel;
    private readonly userModel;
    private readonly orgModel;
    constructor(advertModel: Model<AdvertDocument>, userModel: Model<UserDocument>, orgModel: Model<organizationDocument>);
    findAll(page?: number, limit?: number, filter?: string, authorId?: string): Promise<any[]>;
    findOne(advertId: any): Promise<any>;
    create(data: CreateAdvertDTO, user: any): Promise<any>;
    createOrg(data: CreateAdvertDTO, authorId: any): Promise<any>;
    update(data: CreateAdvertDTO, advertId: any, authorId: any): Promise<any>;
}
