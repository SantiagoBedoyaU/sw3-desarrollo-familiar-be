import { Test, TestingModule } from '@nestjs/testing';
import { PracticeReportsController } from './practice-reports.controller';
import { PracticeReportsService } from './practice-reports.service';

describe('PracticeReportsController', () => {
  let controller: PracticeReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PracticeReportsController],
      providers: [PracticeReportsService],
    }).compile();

    controller = module.get<PracticeReportsController>(PracticeReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
