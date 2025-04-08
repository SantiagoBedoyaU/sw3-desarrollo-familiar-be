import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PracticeReportsService } from './practice-reports.service';
import { CreatePracticeReportDto } from './dto/create-practice-report.dto';
import { UpdatePracticeReportDto } from './dto/update-practice-report.dto';

@Controller('practice-reports')
export class PracticeReportsController {
  constructor(
    private readonly practiceReportsService: PracticeReportsService,
  ) {}

  @Post()
  create(@Body() createPracticeReportDto: CreatePracticeReportDto) {
    return this.practiceReportsService.create(createPracticeReportDto);
  }

  @Get()
  findAll() {
    return this.practiceReportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.practiceReportsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePracticeReportDto: UpdatePracticeReportDto,
  ) {
    return this.practiceReportsService.update(+id, updatePracticeReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.practiceReportsService.remove(+id);
  }
}
