import { Model } from 'mongoose';
import { organizationDocument } from 'src/organization/schema/organization.schema';
import { UserDocument } from 'src/user/entity/user.schema';
import { VictoryDocument } from './entities/victory.entity';
export declare class VictoryService {
    private readonly VictoryModel;
    private readonly userModel;
    private readonly orgModel;
    constructor(VictoryModel: Model<VictoryDocument>, userModel: Model<UserDocument>, orgModel: Model<organizationDocument>);
    create(body: string, authorId: string): Promise<any>;
    findAll(page?: number, limit?: number, filter?: string, authorId?: string): Promise<any[]>;
    findOne(victoryId: any): Promise<any>;
    remove(id: number): string;
}
