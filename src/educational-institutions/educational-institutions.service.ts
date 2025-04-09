import { Injectable } from '@nestjs/common';
import { EducationalInstitutionsRepository } from './educational-institutions.repository';
import { BaseService } from 'src/shared/service/base-service';
import { EducationalInstitution } from './entities/educational-institution.entity';
import { EducationalInstitutionQueryParams } from './dto/educational-institution-query-params.dto';
import { FilterQuery } from 'mongoose';

@Injectable()
export class EducationalInstitutionsService extends BaseService<
  EducationalInstitution,
  EducationalInstitutionsRepository
> {
  constructor(
    private readonly educationalInstitutionRepository: EducationalInstitutionsRepository,
  ) {
    super(educationalInstitutionRepository);
  }
  findAllWithPracticeReportCount(
    queryParams: EducationalInstitutionQueryParams,
  ) {
    const filter: FilterQuery<EducationalInstitution> = {};
    if (queryParams.name) {
      filter.name = { $regex: queryParams.name, $options: 'i' };
    }
    return this.educationalInstitutionRepository.findAllWithPracticeReportCount(
      filter,
      queryParams.limit,
      queryParams.page,
    );
  }
}
