import {
  IsString,
  IsOptional,
  IsUrl,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  eventDate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsOptional()
  externalLink?: string;
}
