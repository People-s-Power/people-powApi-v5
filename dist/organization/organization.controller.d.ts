import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/entity/user.schema';
export declare class OrgsController {
    private readonly userModel;
    logger: Logger;
    constructor(userModel: Model<UserDocument>);
    uploadImage(data: {
        image: string;
    }, param: any): Promise<string>;
}
