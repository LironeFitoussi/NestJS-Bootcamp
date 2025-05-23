import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    // Get All Reports
    @Get()
    async getAllReports() {
        const reports = await  this.reportsService.getAllReports();
        if (!reports) {
            return { message: 'No reports found' };
        }
        return { message: 'Reports retrieved successfully', reports };
    }

    // Add Report
    @Post()
    async addReport(@Body() report: any) {
        const newReport = await this.reportsService.addReport(report);
        return { message: 'Report added successfully', report: newReport };
    }

    // Approve Report
    @Patch(':id/approve')
    async approveReport(@Param('id') id: string, @Query('isApproved') isApproved: boolean) {
        const updatedReport = await this.reportsService.approveReport(id, isApproved);
        if (!updatedReport) {
            return { message: 'Report not found' };
        }
        return { message: 'Report updated successfully', report: updatedReport };
    }
}
