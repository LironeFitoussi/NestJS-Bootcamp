import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards, Session, NotFoundException } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    // Get All Reports
    @Get()
    async getAllReports() {
        const reports = await this.reportsService.getAllReports();
        return { message: 'Reports retrieved successfully', reports };
    }

    // Add Report
    @Post()
    @UseGuards(AuthGuard)
    async addReport(@Body() reportDto: CreateReportDto, @Session() session: any) {
        const newReport = await this.reportsService.addReport(reportDto, session.userId);
        return { message: 'Report added successfully', report: newReport };
    }

    // Approve Report
    @Patch(':id/approve')
    @UseGuards(AuthGuard)
    async approveReport(
        @Param('id') id: string, 
        @Query('isApproved') isApproved: boolean
    ) {
        const updatedReport = await this.reportsService.approveReport(parseInt(id), isApproved === true);
        return { message: 'Report updated successfully', report: updatedReport };
    }
}
