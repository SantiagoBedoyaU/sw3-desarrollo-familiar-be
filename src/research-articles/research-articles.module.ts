import { Module } from '@nestjs/common';
import { ResearchArticlesService } from './research-articles.service';
import { ResearchArticlesController } from './research-articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ResearchArticle,
  ResearchArticleSchema,
} from './entities/research-article.entity';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { ResearchArticlesRepository } from './research-articles.repository';
import { PracticeReportsModule } from 'src/practice-reports/practice-reports.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ResearchArticle.name, schema: ResearchArticleSchema },
    ]),
    SupabaseModule,
    PracticeReportsModule,
  ],
  controllers: [ResearchArticlesController],
  providers: [ResearchArticlesService, ResearchArticlesRepository],
})
export class ResearchArticlesModule {}
