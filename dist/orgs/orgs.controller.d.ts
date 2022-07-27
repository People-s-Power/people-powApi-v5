import { ClientProxy } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { ReqWithUser } from 'src/typings';
import { UserDocument } from 'src/user/entity/user.schema';
import { CreateOrgDTO } from './dto/org.dto';
import { OrgDocument } from './dto/org.schema';
export declare class OrgsController {
    private client;
    private readonly userModel;
    constructor(client: ClientProxy, userModel: Model<UserDocument>);
    createOrg(req: ReqWithUser, data: CreateOrgDTO): Promise<string>;
    getOrgs(): Observable<OrgDocument[]>;
    getOrg(param: any): Observable<OrgDocument>;
    uploadImage(data: {
        file: string;
    }, param: any): Promise<string>;
}
