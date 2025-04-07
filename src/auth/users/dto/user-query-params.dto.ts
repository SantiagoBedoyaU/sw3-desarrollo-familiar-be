import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class UserQueryParamsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
