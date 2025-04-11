import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsMongoId,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePracticeReportDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  period: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((item) => item.trim());
    }
    return value;
  })
  authors: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((keyword) => keyword.trim());
    }
    return value;
  })
  keywords: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  primaryThematicAxis: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  secondaryThematicAxis?: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  institutionId: string;

  @ApiPropertyOptional()
  @IsOptional()
  researchArticle?: string;

  @ApiProperty()
  @IsOptional()
  fileAddress?: string;
}
