import { Injectable } from '@nestjs/common';
import { ResearchArticlesRepository } from 'src/research-articles/research-articles.repository';

@Injectable()
export class ReportsService {
  constructor(
    private readonly researchArticleRepository: ResearchArticlesRepository,
  ) {}
  async getResearchArticlesReport() {
    const [mostDownloadArticle, mostViewedArticle] = await Promise.all([
      this.researchArticleRepository.getMostDownloadedArticle(),
      this.researchArticleRepository.getMostViewedArticle(),
    ]);

    return {
      mostViewed: mostViewedArticle[0],
      mostDownload: mostDownloadArticle[0],
    };
  }
}
