import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EducationalMaterialDocument = HydratedDocument<EducationalMaterial>;

export enum EducationalMaterialCategory {
  Written,
  Audiovisual,
}

@Schema({
  versionKey: false,
})
export class EducationalMaterial {
  @Prop({
    required: true,
    unique: true,
  })
  title: string;

  @Prop({
    enum: EducationalMaterialCategory,
    required: true,
  })
  category: number;

  @Prop({
    required: true,
  })
  fileAddress: string;

  @Prop({
    default: 0,
  })
  downloadCounter?: number;
}

export const EducationalMaterialSchema =
  SchemaFactory.createForClass(EducationalMaterial);
