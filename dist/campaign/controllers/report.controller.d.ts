import { ReportCampService } from '../services/reportCamp.service';
export declare class ReportCampController {
    private readonly reportCampService;
    constructor(reportCampService: ReportCampService);
    getCampReports(param: any): Promise<(import("../schema/reportCamp.schema").ReportCamp & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    getAllReports(): Promise<(import("../schema/reportCamp.schema").ReportCamp & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    createReportPost(data: any): Promise<import("../schema/reportCamp.schema").ReportCamp & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    resolveReportPut(param: any): Promise<import("mongodb").DeleteResult>;
}
