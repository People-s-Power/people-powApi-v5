import { Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { ReqWithUser } from 'src/typings';
import { UserDocument } from 'src/user/entity/user.schema';
import { createOperator, CreateOrgDTO, UpdateOrgDTO } from './dto/org.dto';
import { OrgDocument } from './dto/org.schema';
export declare class OrgsController {
    private client;
    private readonly userModel;
    logger: Logger;
    constructor(client: ClientProxy, userModel: Model<UserDocument>);
    createOrg(req: ReqWithUser, data: CreateOrgDTO): Promise<string>;
    getOrgs(): Observable<OrgDocument[]>;
    getOrg(param: any): Observable<OrgDocument>;
    getUserOrg(req: ReqWithUser): Observable<OrgDocument[]>;
    uploadImage(data: {
        image: string;
    }, param: any): Promise<string>;
    updateOrg(data: UpdateOrgDTO, param: any): Promise<string>;
    follow(body: any, req: ReqWithUser): string;
    unfollow(body: any, req: ReqWithUser): string;
    createOperator(data: createOperator): Promise<void>;
    updateOperator(data: createOperator): Promise<void>;
    deleteOperator(data: {
        userId: string;
        orgId: string;
    }): Promise<void>;
}
