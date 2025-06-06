import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-sestimate.dto';

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

    async createEstimate({ make, model, year, lat, lng, mileage }: GetEstimateDto) {
        return this.repo.createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('make = :make', { make })
        .andWhere('model = :model', { model })
        .andWhere('year - :year BETWEEN -3 AND 3', { year })
        .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
        .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
        .andWhere('approved IS true')
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        .setParameters({ mileage })
        .limit(3)
        .getRawOne()
    }
}
