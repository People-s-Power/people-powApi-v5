import { Body, Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ReportCampService } from '../services/reportCamp.service';

@Controller('api/v3/campaign/report')
export class ReportCampController {
  constructor(
    private readonly reportCampService: ReportCampService
    ) {}

    @Get('/:slug')
    async getCampReports(@Param() param) {
      const { slug } = param
      const results = await this.reportCampService.getReports(slug)
      return results
    }

    @Get()
    getAllReports() {
      return this.reportCampService.getAllReports()
    }

    @Post()
    createReportPost(@Body() data) {
      return this.reportCampService.createReport(data);
    }

    @Put('/:reportId')
    resolveReportPut(@Param() param) {
      const { reportId } = param
      return this.reportCampService.resolveReport(reportId);
    }

}
