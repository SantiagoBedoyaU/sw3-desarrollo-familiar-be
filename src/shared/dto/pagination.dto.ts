import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  page?: number = 1;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  limit?: number = 10;
}
