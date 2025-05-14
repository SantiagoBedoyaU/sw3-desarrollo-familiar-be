import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  Header,
  Res,
} from '@nestjs/common';
import { EducationalMaterialService } from './educational-material.service';
import { CreateEducationalMaterialDto } from './dto/create-educational-material.dto';
import { UpdateEducationalMaterialDto } from './dto/update-educational-material.dto';
import { EducationalMaterialQueryParams } from './dto/educational-material-query-params.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FilterQuery } from 'mongoose';
import { EducationalMaterial } from './entities/educational-material.entity';

@Controller('educational-material')
export class EducationalMaterialController {
  constructor(
    private readonly educationalMaterialService: EducationalMaterialService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createEducationalMaterialDto: CreateEducationalMaterialDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.educationalMaterialService.createAndUpload(
      createEducationalMaterialDto,
      file,
    );
  }

  @Get()
  findAll(@Query() queryParams: EducationalMaterialQueryParams) {
    const filter: FilterQuery<EducationalMaterial> = {};
    if (queryParams.title) {
      filter.title = {
        $regex: queryParams.title,
        $options: 'i',
      };
    }
    if (queryParams.type) {
      filter.type = {
        $eq: queryParams.type,
      };
    }
    if (queryParams.minAge) {
      filter.minAge = {
        $eq: queryParams.minAge,
      };
    }
    if (queryParams.maxAge) {
      filter.minAge = {
        $eq: queryParams.maxAge,
      };
    }

    return this.educationalMaterialService.findAll(
      filter,
      queryParams.limit,
      queryParams.page,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationalMaterialService.findOne(id);
  }

  @Get(':id/download')
  @Header('Content-Type', 'application/octet-stream')
  async download(@Param('id') id: string, @Res() res: Response) {
    const { title, data } = await this.educationalMaterialService.download(id);
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
    @Body() updateEducationalMaterialDto: UpdateEducationalMaterialDto,
  ) {
    return this.educationalMaterialService.update(
      id,
      updateEducationalMaterialDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationalMaterialService.remove(id);
  }
}
