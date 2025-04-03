import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Header,
  Res,
} from '@nestjs/common';
import { ResearchArticlesService } from './research-articles.service';
import { CreateResearchArticleDto } from './dto/create-research-article.dto';
import { UpdateResearchArticleDto } from './dto/update-research-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('research-articles')
export class ResearchArticlesController {
  constructor(
    private readonly researchArticlesService: ResearchArticlesService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createResearchArticleDto: CreateResearchArticleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.researchArticlesService.create(createResearchArticleDto, file);
  }

  @Get()
  findAll() {
    return this.researchArticlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.researchArticlesService.findOne(id);
  }

  @Get(':id/download')
  @Header('Content-Type', 'application/octet-stream')
  async download(@Param('id') id: string, @Res() res: Response) {
    const { title, data } = await this.researchArticlesService.download(id);
    const buffer = await data.arrayBuffer();
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="{{${title.replace(' ', '_')}.pdf}}"`,
    );
    res.send(Buffer.from(buffer));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResearchArticleDto: UpdateResearchArticleDto,
  ) {
    return this.researchArticlesService.update(id, updateResearchArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.researchArticlesService.remove(id);
  }
}
