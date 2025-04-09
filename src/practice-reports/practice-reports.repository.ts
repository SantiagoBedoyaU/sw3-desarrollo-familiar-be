import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PracticeReport } from './entities/practice-report.entity';
import { BaseRepository } from '../shared/repository/base-repository';

@Injectable()
export class PracticeReportsRepository extends BaseRepository<PracticeReport> {
  constructor(
    @InjectModel(PracticeReport.name)
    private readonly practiceReportModel: Model<PracticeReport>,
  ) {
    super(practiceReportModel);
  }
}
