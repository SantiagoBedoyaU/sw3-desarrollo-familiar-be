import { BaseRepository } from '../shared/repository/base-repository';
import { ResearchArticle } from './entities/research-article.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResearchArticlesRepository extends BaseRepository<ResearchArticle> {
  constructor(
    @InjectModel(ResearchArticle.name)
    private readonly researchArticleModel: Model<ResearchArticle>,
  ) {
    super(researchArticleModel);
  }
  getTop5() {
    return this.researchArticleModel
      .find()
      .sort({ counter: -1, downloadCounter: -1 })
      .limit(5)
      .exec();
  }
  getMostDownloadedArticle() {
    return this.researchArticleModel
      .find()
      .sort({ downloadCounter: -1 })
      .limit(1)
      .exec();
  }
  getMostViewedArticle() {
    return this.researchArticleModel
      .find()
      .sort({ counter: -1 })
      .limit(1)
      .exec();
  }

  getThematicAxisCount() {
    // group research articles by primaryThematicAxis and by secondaryThematicAxis and count
    return this.researchArticleModel.aggregate([
      {
        $group: {
          _id: '$primaryThematicAxis',
          count: { $sum: 1 },
        },
      },
    ]);
  }

  getArticleViewsSum() {
    // sum the counter attribute from all research articles
    return this.researchArticleModel.aggregate([
      {
        $group: {
          _id: null,
          sum: { $sum: '$counter' },
        },
      },
    ]);
  }

  getArticleDownloadsSum() {
    // sum the counter attribute from all research articles
    return this.researchArticleModel.aggregate([
      {
        $group: {
          _id: null,
          sum: { $sum: '$downloadCounter' },
        },
      },
    ]);
  }

  getTotalArticles() {
    // get total articles
    return this.researchArticleModel.countDocuments().exec();
  }
}
