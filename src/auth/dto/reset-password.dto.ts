import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
