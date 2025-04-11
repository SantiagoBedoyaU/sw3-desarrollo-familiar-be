import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('/research-articles')
  @UseGuards(AuthGuard)
  getResearchArticlesReport() {
    return this.reportsService.getResearchArticlesReport();
  }

  @Get('/practice-reports')
  @UseGuards(AuthGuard)
  getPracticeReportsReport() {
    return this.reportsService.getPracticeReportsReport();
  }

  @Get('/thematic-axis')
  @UseGuards(AuthGuard)
  getThematicAxisReport() {
    return this.reportsService.getThematicAxisReport();
  }

  @Get('/thematic-axis/practice-reports')
  @UseGuards(AuthGuard)
  getPracticeThematicAxisReport() {
    return this.reportsService.getPracticeThematicAxisReport();
  }
}
