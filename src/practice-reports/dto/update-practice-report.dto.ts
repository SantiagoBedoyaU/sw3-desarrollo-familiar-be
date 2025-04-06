import { PartialType } from '@nestjs/swagger';
import { CreatePracticeReportDto } from './create-practice-report.dto';

export class UpdatePracticeReportDto extends PartialType(CreatePracticeReportDto) {}
