import { Injectable } from '@nestjs/common';
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
        console.log(report);
        
        report.user = user;
        console.log(report);
        return this.repo.save(report);
    }
}
