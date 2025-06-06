import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>){}
    create (reportDto: CreateReportDto, user: User) {
        const report  = this.repo.create(reportDto);        
        report.user = user;
        return this.repo.save(report);
    }

    async changeApproval (id: number, approve: boolean) {
        const report = await this.repo.findOne({ 
            where: { id },
            relations: ['user']
        })
        if (!report) {
            throw new NotFoundException('Report Not Found')
        }

        report.approved = approve;
        return this.repo.save(report);
    }
}
