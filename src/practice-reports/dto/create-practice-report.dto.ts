import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsMongoId,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class CreatePracticeReportDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  period: string; // ejemplo: "2025-1"

  @IsNotEmpty()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((item) => item.trim());
    }
    return value;
  })
  authors: string[];

  @IsNotEmpty()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((keyword) => keyword.trim());
    }
    return value;
  })
  keywords: string[];

  @IsString()
  @IsNotEmpty()
  primaryThematicAxis: string;

  @IsOptional()
  @IsString()
  secondaryThematicAxis?: string;

  @IsMongoId()
  @IsNotEmpty()
  institutionId: string;

  @IsOptional()
  researchArticle?: Types.ObjectId;

  @IsOptional()
  fileAddress?: string;
}
