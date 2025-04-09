import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ResearchArticlesModule } from 'src/research-articles/research-articles.module';

@Module({
  imports: [ResearchArticlesModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
