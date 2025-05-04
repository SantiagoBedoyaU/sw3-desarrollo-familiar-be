import { Test, TestingModule } from '@nestjs/testing';
import { EducationalMaterialService } from './educational-material.service';

describe('EducationalMaterialService', () => {
  let service: EducationalMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationalMaterialService],
    }).compile();

    service = module.get<EducationalMaterialService>(
      EducationalMaterialService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
