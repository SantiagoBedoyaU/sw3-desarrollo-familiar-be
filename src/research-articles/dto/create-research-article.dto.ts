import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

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
  @IsString()
  @Transform(({ value }) =>
    value.split(',').map((author: string) => author.trim()),
  )
  authors: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  primaryThematicAxis: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  secondaryThematicAxis: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) =>
    value.split(',').map((keyword: string) => keyword.trim()),
  )
  keywords: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  summary: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  practiceReport: string;

  fileAddress?: string;
}
