import { Injectable } from '@nestjs/common';
import { ResearchArticlesRepository } from 'src/research-articles/research-articles.repository';

@Injectable()
export class ReportsService {
  constructor(
    private readonly researchArticleRepository: ResearchArticlesRepository,
  ) {}
  async getResearchArticlesReport() {
    const mostDownloadArticle =
      await this.researchArticleRepository.getMostDownloadedArticle();
    const mostViewedArticle =
      await this.researchArticleRepository.getMostViewedArticle();

    return {
      mostViewed: mostViewedArticle[0],
      mostDownload: mostDownloadArticle[0],
    };
  }
}
