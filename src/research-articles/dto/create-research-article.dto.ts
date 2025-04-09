import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateResearchArticleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  year: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) =>
    value.split(',').map((author: string) => author.trim()),
  )
  authors: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  primaryThematicAxis: string;

  @ApiProperty()
  @IsString()
  secondaryThematicAxis: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) =>
    value.split(',').map((keyword: string) => keyword.trim()),
  )
  keywords: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  summary: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  practiceReport?: string;

  fileAddress?: string;
}
