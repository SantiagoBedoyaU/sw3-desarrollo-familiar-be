import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateResearchArticleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  year: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  authors: string;

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
  keywords: string;

  @IsNotEmpty()
  @IsString()
  summary: string;
  fileAddress?: string;
}
