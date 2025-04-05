import { BaseRepository } from 'src/shared/repository/base-repository';
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
}
