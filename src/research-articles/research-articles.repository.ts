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
}
