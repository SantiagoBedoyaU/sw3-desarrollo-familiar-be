import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/repository/base-repository';
import { EducationalInstitution } from './entities/educational-institution.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EducationalInstitutionsRepository extends BaseRepository<EducationalInstitution> {
  constructor(
    @InjectModel(EducationalInstitution.name)
    private readonly educationalInstitutionModel: Model<EducationalInstitution>,
  ) {
    super(educationalInstitutionModel);
  }
}
