import { PartialType } from '@nestjs/mapped-types';
import { CreateResearchArticleDto } from './create-research-article.dto';

export class UpdateResearchArticleDto extends PartialType(CreateResearchArticleDto) {}
