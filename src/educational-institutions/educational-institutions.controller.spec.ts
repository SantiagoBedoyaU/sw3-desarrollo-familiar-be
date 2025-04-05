import { Test, TestingModule } from '@nestjs/testing';
import { EducationalInstitutionsController } from './educational-institutions.controller';
import { EducationalInstitutionsService } from './educational-institutions.service';

describe('EducationalInstitutionsController', () => {
  let controller: EducationalInstitutionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationalInstitutionsController],
      providers: [EducationalInstitutionsService],
    }).compile();

    controller = module.get<EducationalInstitutionsController>(EducationalInstitutionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
