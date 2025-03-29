import { Test, TestingModule } from '@nestjs/testing';
import { ResearchArticlesController } from './research-articles.controller';
import { ResearchArticlesService } from './research-articles.service';

describe('ResearchArticlesController', () => {
  let controller: ResearchArticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResearchArticlesController],
      providers: [ResearchArticlesService],
    }).compile();

    controller = module.get<ResearchArticlesController>(ResearchArticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
