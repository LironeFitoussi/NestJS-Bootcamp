import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
    constructor(private reportsRepository: ReportsRepository) {}
    
    // Get All Reports
    async getAllReports() {
        return this.reportsRepository.getAllReports();
    }

    // Add Report
    async addReport(reportDto: CreateReportDto, userId: number) {
        return this.reportsRepository.addReport(reportDto, userId);
    }

    // Approve Report
    async approveReport(id: number, isApproved: boolean) {
        return this.reportsRepository.approveReport(id, isApproved);
    }
}
