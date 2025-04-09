import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PracticeReportsService } from './practice-reports.service';
import { PracticeReportsController } from './practice-reports.controller';
import {
  PracticeReport,
  PracticeReportSchema,
} from './entities/practice-report.entity';
import { PracticeReportsRepository } from './practice-reports.repository';

import { SupabaseModule } from '../supabase/supabase.module';
import { EducationalInstitutionsModule } from '../educational-institutions/educational-institutions.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PracticeReport.name, schema: PracticeReportSchema },
    ]),
    SupabaseModule,
    EducationalInstitutionsModule,
  ],
  controllers: [PracticeReportsController],
  providers: [PracticeReportsService, PracticeReportsRepository],
  exports: [PracticeReportsService, PracticeReportsRepository],
})
export class PracticeReportsModule {}
