import { UpdateService } from '../services/update.service';
export declare class UpdateController {
    private readonly updateService;
    constructor(updateService: UpdateService);
    addUpdate(data: any): Promise<import("../schema/update.schema").Update & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getCampUpdates(param: any): Promise<(import("../schema/update.schema").Update & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
}
