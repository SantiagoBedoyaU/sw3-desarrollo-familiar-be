import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class PracticeReportQueryParams extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  year?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  authors?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  primaryThematicAxis?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  secondaryThematicAxis?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  keywords?: string;
}
