import { Logger } from '@nestjs/common';
import { OrganizationService } from './organization.service';
export declare class OrganizationController {
    private readonly organizationService;
    logger: Logger;
    constructor(organizationService: OrganizationService);
    uploadImage(data: {
        image: string;
    }, param: any): Promise<import("./schema/organization.schema").organizationDocument>;
}
