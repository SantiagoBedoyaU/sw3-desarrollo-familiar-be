import { Injectable } from '@nestjs/common';
import { CreateEducationalInstitutionDto } from './dto/create-educational-institution.dto';
import { UpdateEducationalInstitutionDto } from './dto/update-educational-institution.dto';
import { EducationalInstitutionsRepository } from './educational-institutions.repository';

@Injectable()
export class EducationalInstitutionsService {
  constructor(private readonly repository: EducationalInstitutionsRepository) {}
  create(createEducationalInstitutionDto: CreateEducationalInstitutionDto) {
    return this.repository.create(createEducationalInstitutionDto);
  }

  findAll() {
    return this.repository.findAll({}, 10, 1);
  }

  findOne(id: string) {
    return this.repository.findOne({ _id: id });
  }

  update(
    id: string,
    updateEducationalInstitutionDto: UpdateEducationalInstitutionDto,
  ) {
    return this.repository.update({ _id: id }, updateEducationalInstitutionDto);
  }

  remove(id: string) {
    return this.repository.delete({ _id: id });
  }
}
