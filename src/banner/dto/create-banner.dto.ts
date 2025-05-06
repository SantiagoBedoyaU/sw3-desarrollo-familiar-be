import {
  IsString,
  IsOptional,
  IsUrl,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBannerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  eventDate?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  externalLink?: string;
}
