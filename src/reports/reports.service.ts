import { Injectable } from '@nestjs/common';
import { ResearchArticlesRepository } from 'src/research-articles/research-articles.repository';
import { PracticeReportsRepository } from 'src/practice-reports/practice-reports.repository';

@Injectable()
export class ReportsService {
  constructor(
    private readonly researchArticleRepository: ResearchArticlesRepository,
    private readonly practiceReportsRepository: PracticeReportsRepository,
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

  async getPracticeReportsReport() {
    const mostDownloadedReports =
      await this.practiceReportsRepository.getMostDownloadedReports();
    const mostInteractedReports =
      await this.practiceReportsRepository.getMostInteractedReports();

    return {
      mostDownloaded: mostDownloadedReports[0],
      mostInteracted: mostInteractedReports[0],
    };
  }
}
