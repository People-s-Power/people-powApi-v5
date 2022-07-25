import { ClientProxy } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { ReqWithUser } from 'src/typings';
import { UserDocument } from 'src/user/entity/user.schema';
import { CreateOrgDTO } from './dto/org.dto';
export declare class OrgsController {
    private client;
    private readonly userModel;
    constructor(client: ClientProxy, userModel: Model<UserDocument>);
    createOrg(req: ReqWithUser, data: CreateOrgDTO): Promise<string>;
}
