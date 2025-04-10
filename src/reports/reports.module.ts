import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ResearchArticlesModule } from 'src/research-articles/research-articles.module';
import { PracticeReportsModule } from 'src/practice-reports/practice-reports.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ResearchArticlesModule, PracticeReportsModule,  JwtModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
