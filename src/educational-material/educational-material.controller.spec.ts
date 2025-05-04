import { Test, TestingModule } from '@nestjs/testing';
import { EducationalMaterialController } from './educational-material.controller';
import { EducationalMaterialService } from './educational-material.service';

describe('EducationalMaterialController', () => {
  let controller: EducationalMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationalMaterialController],
      providers: [EducationalMaterialService],
    }).compile();

    controller = module.get<EducationalMaterialController>(EducationalMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
