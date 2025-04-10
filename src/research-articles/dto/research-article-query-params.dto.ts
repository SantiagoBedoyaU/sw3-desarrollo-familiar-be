import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class ResearchArticleQueryParams extends PaginationDto {
  title?: string;
  year?: string;
  authors?: string;
  primaryThematicAxis?: string;
  secondaryThematicAxis?: string;
  keywords?: string;
}
