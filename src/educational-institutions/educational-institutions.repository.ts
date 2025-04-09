import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/repository/base-repository';
import { EducationalInstitution } from './entities/educational-institution.entity';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class EducationalInstitutionsRepository extends BaseRepository<EducationalInstitution> {
  constructor(
    @InjectModel(EducationalInstitution.name)
    private readonly educationalInstitutionModel: Model<EducationalInstitution>,
  ) {
    super(educationalInstitutionModel);
  }
  async findAllWithPracticeReportCount(
    filter: FilterQuery<EducationalInstitution>,
    limit: number,
    page: number,
  ) {
    const skip = (page - 1) * limit;

    const [data, totalItems] = await Promise.all([
      this.educationalInstitutionModel.aggregate([
        { $match: filter },
        {
          $lookup: {
            from: 'PracticeReports',
            localField: '_id',
            foreignField: 'practiceReport',
            as: 'practiceReports',
          },
        },
        {
          $addFields: {
            practiceReportCount: { $size: '$practiceReports' },
          },
        },
        {
          $project: {
            practiceReports: 0,
          },
        },
        { $skip: skip },
        { $limit: limit },
      ]),
      this.educationalInstitutionModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
    };
  }
}
