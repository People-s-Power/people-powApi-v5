import { Model } from 'mongoose';
import { Update, UpdateDocument } from '../schema/update.schema';
export declare class UpdateService {
    private readonly UpdateModel;
    constructor(UpdateModel: Model<UpdateDocument>);
    addUpdates(campaignId: any, body: any): Promise<Update & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getCampUpdates(campaignId: any): Promise<(Update & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
