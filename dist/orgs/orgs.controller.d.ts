import { ClientProxy } from '@nestjs/microservices';
import { ReqWithUser } from 'src/typings';
export declare class OrgsController {
    private client;
    constructor(client: ClientProxy);
    createOrg(req: ReqWithUser): string;
}
