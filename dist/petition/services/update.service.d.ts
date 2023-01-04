import { Model } from 'mongoose';
import { Update, UpdateDocument } from '../schema/update.schema';
export declare class UpdateService {
    private readonly UpdateModel;
    constructor(UpdateModel: Model<UpdateDocument>);
    addUpdates(petitionId: any, body: any, img: any): Promise<Update & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getPetitionUpdates(petitionId: any): Promise<(Update & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
