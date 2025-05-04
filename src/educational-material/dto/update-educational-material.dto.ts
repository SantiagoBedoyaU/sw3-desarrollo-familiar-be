import { PartialType } from '@nestjs/swagger';
import { CreateEducationalMaterialDto } from './create-educational-material.dto';

export class UpdateEducationalMaterialDto extends PartialType(
  CreateEducationalMaterialDto,
) {}
