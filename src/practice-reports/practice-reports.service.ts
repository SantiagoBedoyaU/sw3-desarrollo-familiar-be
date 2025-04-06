import { Injectable } from '@nestjs/common';
import { CreatePracticeReportDto } from './dto/create-practice-report.dto';
import { UpdatePracticeReportDto } from './dto/update-practice-report.dto';

@Injectable()
export class PracticeReportsService {
  create(createPracticeReportDto: CreatePracticeReportDto) {
    return 'This action adds a new practiceReport';
  }

  findAll() {
    return `This action returns all practiceReports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} practiceReport`;
  }

  update(id: number, updatePracticeReportDto: UpdatePracticeReportDto) {
    return `This action updates a #${id} practiceReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} practiceReport`;
  }
}
