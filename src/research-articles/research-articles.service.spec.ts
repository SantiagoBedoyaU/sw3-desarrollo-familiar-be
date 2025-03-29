import { Test, TestingModule } from '@nestjs/testing';
import { ResearchArticlesService } from './research-articles.service';

describe('ResearchArticlesService', () => {
  let service: ResearchArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearchArticlesService],
    }).compile();

    service = module.get<ResearchArticlesService>(ResearchArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
