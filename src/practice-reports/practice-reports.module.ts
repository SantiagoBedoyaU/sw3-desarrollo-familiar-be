import { Module } from '@nestjs/common';
import { PracticeReportsService } from './practice-reports.service';
import { PracticeReportsController } from './practice-reports.controller';

@Module({
  controllers: [PracticeReportsController],
  providers: [PracticeReportsService],
})
export class PracticeReportsModule {}
