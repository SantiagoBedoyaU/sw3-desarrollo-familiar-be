import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class EducationalMaterialQueryParams extends PaginationDto {
  title?: string;
  category?: number;
}
