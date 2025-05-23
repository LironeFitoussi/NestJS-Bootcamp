import { Injectable } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';

@Injectable()
export class ReportsService {
    constructor(private reportsRepository: ReportsRepository) {}
    
    // Get All Reports
    async getAllReports() {
        return this.reportsRepository.getAllReports();
    }

    // Add Report
    async addReport(report: any) {
        return this.reportsRepository.addReport(report);
    }

    // Approve Report
    async approveReport(id: string, isApproved: boolean) {
        return this.reportsRepository.approveReport(id, isApproved);
    }
}
