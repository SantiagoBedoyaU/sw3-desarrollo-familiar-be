import { Module } from '@nestjs/common';
import { EducationalMaterialService } from './educational-material.service';
import { EducationalMaterialController } from './educational-material.controller';
import { EducationalMaterialRepository } from './educational-material.repository';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EducationalMaterial,
  EducationalMaterialSchema,
} from './entities/educational-material.entity';

@Module({
  imports: [
    SupabaseModule,
    MongooseModule.forFeature([
      { name: EducationalMaterial.name, schema: EducationalMaterialSchema },
    ]),
  ],
  controllers: [EducationalMaterialController],
  providers: [EducationalMaterialService, EducationalMaterialRepository],
})
export class EducationalMaterialModule {}
