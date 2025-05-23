import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ReportsRepository } from './reports.repository';
import { Report } from './report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  providers: [ReportsService, ReportsRepository],
  controllers: [ReportsController]
})
export class ReportsModule {}
