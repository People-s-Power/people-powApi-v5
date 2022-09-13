import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { ReportCamp, ReportCampDocument } from '../schema/reportCamp.schema';
export declare class ReportCampService {
    private readonly configService;
    private readonly reportModel;
    constructor(configService: ConfigService, reportModel: Model<ReportCampDocument>);
    getAllReports(): Promise<(ReportCamp & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    createReport(data: any): Promise<ReportCamp & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    resolveReport(reportId: String): Promise<import("mongodb").DeleteResult>;
    getReports(slug: string): Promise<(ReportCamp & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
}
