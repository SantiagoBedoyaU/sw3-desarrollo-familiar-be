import { Test, TestingModule } from '@nestjs/testing';
import { PracticeReportsService } from './practice-reports.service';

describe('PracticeReportsService', () => {
  let service: PracticeReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PracticeReportsService],
    }).compile();

    service = module.get<PracticeReportsService>(PracticeReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
