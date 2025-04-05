import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EducationalInstitutionsService } from './educational-institutions.service';
import { CreateEducationalInstitutionDto } from './dto/create-educational-institution.dto';
import { UpdateEducationalInstitutionDto } from './dto/update-educational-institution.dto';

@Controller('educational-institutions')
export class EducationalInstitutionsController {
  constructor(
    private readonly educationalInstitutionsService: EducationalInstitutionsService,
  ) {}

  @Post()
  create(
    @Body() createEducationalInstitutionDto: CreateEducationalInstitutionDto,
  ) {
    return this.educationalInstitutionsService.create(
      createEducationalInstitutionDto,
    );
  }

  @Get()
  findAll() {
    return this.educationalInstitutionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationalInstitutionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEducationalInstitutionDto: UpdateEducationalInstitutionDto,
  ) {
    return this.educationalInstitutionsService.update(
      id,
      updateEducationalInstitutionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationalInstitutionsService.remove(id);
  }
}
