import { Injectable } from '@nestjs/common';
import { EducationalInstitutionsRepository } from './educational-institutions.repository';
import { BaseService } from 'src/shared/service/base-service';
import { EducationalInstitution } from './entities/educational-institution.entity';
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
}
