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

  getTop5() {
    return this.practiceReportModel
      .find()
      .sort({ downloadCounter: -1, counter: -1 })
      .limit(5)
      .exec();
  }

  async getMostInteractedReports() {
    return this.practiceReportModel
      .find()
      .sort({ counter: -1 })
      .limit(5)
      .exec();
  }

  async getMostDownloadedReports() {
    return this.practiceReportModel
      .find()
      .sort({ downloadCounter: -1 })
      .limit(5)
      .exec();
  }

  getThematicAxisCount() {
    return this.practiceReportModel.aggregate([
      {
        $group: {
          _id: '$primaryThematicAxis',
          count: { $sum: 1 },
        },
      },
    ]);
  }

  getPracticeViewsSum() {
    return this.practiceReportModel.aggregate([
      {
        $group: {
          _id: null,
          sum: { $sum: '$counter' },
        },
      },
    ]);
  }

  getPracticeDownloadsSum() {
    return this.practiceReportModel.aggregate([
      {
        $group: {
          _id: null,
          sum: { $sum: '$downloadCounter' },
        },
      },
    ]);
  }

  getTotalPractice() {
    return this.practiceReportModel.countDocuments().exec();
  }
}
