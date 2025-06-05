import { 
    Controller, 
    Post, 
    Body, 
    UseGuards, 
    Patch,
    Param,
    Get,
    Query
 } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-sestimate.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService){} 

    @Get()
    getEstiamte(@Query() query: GetEstimateDto) {
        return this.reportService.createEstimate(query)
    }

    @Post('/')
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {        
        return this.reportService.create(body, user)
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    @Serialize(ReportDto)
    approveReport(@Param('id') id: number, @Body() body: ApproveReportDto) {
        return this.reportService.changeApproval(id, body.approved)
    }
}
