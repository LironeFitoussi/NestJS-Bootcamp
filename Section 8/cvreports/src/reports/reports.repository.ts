import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsRepository {
    constructor(
        @InjectRepository(Report)
        private repo: Repository<Report>
    ) {}

    // Get All Reports
    async getAllReports() {
        return this.repo.find({
            relations: ['user']
        });
    }

    // Add Report
    async addReport(report: CreateReportDto, userId: number) {
        const newReport = this.repo.create({
            ...report,
            user: { id: userId }
        });
        
        return this.repo.save(newReport);
    }

    // Approving Report
    async approveReport(id: number, isApproved: boolean) {
        const report = await this.repo.findOne({ where: { id } });
        
        if (!report) {
            throw new NotFoundException(`Report with ID ${id} not found`);
        }
        
        report.isApproved = isApproved;
        return this.repo.save(report);
    }
}