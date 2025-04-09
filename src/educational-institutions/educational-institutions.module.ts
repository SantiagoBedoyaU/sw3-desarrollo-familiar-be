import { Module } from '@nestjs/common';
import { EducationalInstitutionsService } from './educational-institutions.service';
import { EducationalInstitutionsController } from './educational-institutions.controller';
import { EducationalInstitutionsRepository } from './educational-institutions.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EducationalInstitution,
  EducationalInstitutionSchema,
} from './entities/educational-institution.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EducationalInstitution.name,
        schema: EducationalInstitutionSchema,
      },
    ]),
  ],
  controllers: [EducationalInstitutionsController],
  providers: [
    EducationalInstitutionsService,
    EducationalInstitutionsRepository,
  ],
  exports: [EducationalInstitutionsRepository],
})
export class EducationalInstitutionsModule {}
