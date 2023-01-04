import { Model } from 'mongoose';
import { PetitionDocument } from '../schema/petition.schema';
import { Update, UpdateDocument } from '../schema/update.schema';
export declare class UpdateService {
    private readonly UpdateModel;
    private readonly PetitionModel;
    constructor(UpdateModel: Model<UpdateDocument>, PetitionModel: Model<PetitionDocument>);
    addUpdates(petitionId: any, body: any, img: any, authorIdRq: any): Promise<Update & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getPetitionUpdates(petitionId: any): Promise<(Update & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
