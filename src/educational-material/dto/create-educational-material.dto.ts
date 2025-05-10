import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { EducationalMaterialType } from '../entities/educational-material.entity';

export class CreateEducationalMaterialDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(EducationalMaterialType)
  type: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(120)
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  minAge?: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  maxAge?: number;

  fileAddress?: string;
}
