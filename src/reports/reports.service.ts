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
    const [
      mostDownloadArticle,
      mostViewedArticle,
      totalViews,
      totalDownloads,
      totalArticles,
    ] = await Promise.all([
      this.researchArticleRepository.getMostDownloadedArticle(),
      this.researchArticleRepository.getMostViewedArticle(),
      this.researchArticleRepository.getArticleViewsSum(),
      this.researchArticleRepository.getArticleDownloadsSum(),
      this.researchArticleRepository.getTotalArticles(),
    ]);

    return {
      mostViewed: mostViewedArticle[0],
      mostDownload: mostDownloadArticle[0],
      totalViews: totalViews[0].sum,
      totalDownloads: totalDownloads[0].sum,
      totalArticles,
    };
  }

  async getPracticeReportsReport() {
    const [
      mostDownloadedReports,
      mostInteractedReports,
      totalViews,
      totalDownloads,
      totalPracticeReports,
    ] = await Promise.all([
      this.practiceReportsRepository.getMostDownloadedReports(),
      this.practiceReportsRepository.getMostInteractedReports(),
      this.practiceReportsRepository.getPracticeViewsSum(),
      this.practiceReportsRepository.getPracticeDownloadsSum(),
      this.practiceReportsRepository.getTotalPractice(),
    ]);

    return {
      mostDownloaded: mostDownloadedReports[0],
      mostInteracted: mostInteractedReports[0],
      totalViews: totalViews[0].sum,
      totalDownloads: totalDownloads[0].sum,
      totalPracticeReports: totalPracticeReports,
    };
  }

  getThematicAxisReport() {
    return this.researchArticleRepository.getThematicAxisCount();
  }

  getPracticeThematicAxisReport() {
    return this.practiceReportsRepository.getThematicAxisCount();
  }
}
