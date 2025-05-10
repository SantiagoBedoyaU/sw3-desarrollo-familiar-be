import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EducationalMaterialDocument = HydratedDocument<EducationalMaterial>;

export enum EducationalMaterialType {
  Document = 'DOCUMENT',
  Image = 'IMAGE',
  Resource = 'RESOURCE',
  Other = 'Other',
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
    enum: EducationalMaterialType,
    required: true,
  })
  type: string;

  @Prop({})
  description?: string;

  @Prop({
    type: Number,
  })
  minAge?: number;

  @Prop({
    type: Number,
  })
  maxAge?: number;

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
