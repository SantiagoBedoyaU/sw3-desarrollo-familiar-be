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
  Query,
  UseGuards,
} from '@nestjs/common';
import { PracticeReportsService } from './practice-reports.service';
import { CreatePracticeReportDto } from './dto/create-practice-report.dto';
import { UpdatePracticeReportDto } from './dto/update-practice-report.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PracticeReportQueryParams } from './dto/practice-reports-query-params.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('practice-reports')
export class PracticeReportsController {
  constructor(
    private readonly practiceReportsService: PracticeReportsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createPracticeReportDTO: CreatePracticeReportDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.practiceReportsService.createAndUpload(
      createPracticeReportDTO,
      file,
    );
  }

  @Get()
  findAll(@Query() queryParams: PracticeReportQueryParams) {
    return this.practiceReportsService.findAll(queryParams);
  }

  @Get('/top-5')
  getTop5Featured() {
    return this.practiceReportsService.getTop5();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.practiceReportsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePracticeReportDto: UpdatePracticeReportDto,
  ) {
    return this.practiceReportsService.update(id, updatePracticeReportDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    await this.practiceReportsService.remove(id);
    return {
      message: 'the report was deleted successfully',
    };
  }

  @Get(':id/download')
  @Header('Content-Type', 'application/octet-stream')
  async download(@Param('id') id: string, @Res() res: Response) {
    const { title, data } = await this.practiceReportsService.download(id);
    const buffer = await data.arrayBuffer();
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${title.replace(' ', '_')}.pdf"`,
    );
    res.send(Buffer.from(buffer));
  }
}
