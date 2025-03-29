import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResearchArticlesService } from './research-articles.service';
import { CreateResearchArticleDto } from './dto/create-research-article.dto';
import { UpdateResearchArticleDto } from './dto/update-research-article.dto';

@Controller('research-articles')
export class ResearchArticlesController {
  constructor(private readonly researchArticlesService: ResearchArticlesService) {}

  @Post()
  create(@Body() createResearchArticleDto: CreateResearchArticleDto) {
    return this.researchArticlesService.create(createResearchArticleDto);
  }

  @Get()
  findAll() {
    return this.researchArticlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.researchArticlesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResearchArticleDto: UpdateResearchArticleDto) {
    return this.researchArticlesService.update(+id, updateResearchArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.researchArticlesService.remove(+id);
  }
}
