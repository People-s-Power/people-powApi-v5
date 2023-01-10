import { ReqWithUser } from 'src/typings';
import { UpdateService } from '../services/update.service';
export declare class UpdateController {
    private readonly updateService;
    constructor(updateService: UpdateService);
    addUpdate(data: any, req: ReqWithUser): Promise<import("../schema/update.schema").Update & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getCampUpdates(param: any): Promise<(import("../schema/update.schema").Update & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
