import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

import { Report } from '../types';

@Injectable()
export class ReportsRepository {
    private reportsFilePath = 'db/reports.json';

    private async readReportsFile() {
        const reportsData = await readFile(this.reportsFilePath, 'utf-8');
        const parsed = JSON.parse(reportsData);
        return parsed.reports as Report[];
    }

    private async writeReportsFile(reports: Report[]) {
        const data = { reports };
        await writeFile(this.reportsFilePath, JSON.stringify(data, null, 2));
    }

    // Get All Reports
    async getAllReports() {
        return this.readReportsFile();
    }

    // Add Report
    async addReport(report: Report) {
        const reports = await this.readReportsFile();
        const newReport = {
            ...report,
            id: Math.random().toString(36).substring(2, 15), // Generate a random ID
        };
        reports.push(newReport);
        await this.writeReportsFile(reports);
        return newReport;
    }

    // Approving Report
    async approveReport(id: string, isApproved: boolean) {
        const reports = await this.readReportsFile();
        const reportIndex = reports.findIndex((report) => report.id === id);
        if (reportIndex === -1) {
            throw new Error('Report not found');
        }
        reports[reportIndex].isApproved = isApproved;
        await this.writeReportsFile(reports);
        return reports[reportIndex];
    }
}