import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  limit?: number = 10;
}
