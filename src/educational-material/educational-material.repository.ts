import { BaseRepository } from 'src/shared/repository/base-repository';
import { EducationalMaterial } from './entities/educational-material.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EducationalMaterialRepository extends BaseRepository<EducationalMaterial> {
  constructor(
    @InjectModel(EducationalMaterial.name)
    private readonly educationalMaterial: Model<EducationalMaterial>,
  ) {
    super(educationalMaterial);
  }
}
