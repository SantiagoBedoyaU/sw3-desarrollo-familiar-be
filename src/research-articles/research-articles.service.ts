import { Injectable } from '@nestjs/common';
import { CreateResearchArticleDto } from './dto/create-research-article.dto';
import { UpdateResearchArticleDto } from './dto/update-research-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ResearchArticle } from './entities/research-article.entity';
import { Model } from 'mongoose';

@Injectable()
export class ResearchArticlesService {
  constructor(
    @InjectModel(ResearchArticle.name) private model: Model<ResearchArticle>,
  ) {}

  create(createResearchArticleDto: CreateResearchArticleDto) {
    const createdResearchArticle = new this.model(createResearchArticleDto);
    return createdResearchArticle.save();
  }

  findAll() {
    return this.model.find().exec();
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  update(id: string, updateResearchArticleDto: UpdateResearchArticleDto) {
    return this.model.findByIdAndUpdate({ _id: id }, updateResearchArticleDto, {
      update: true,
    });
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
