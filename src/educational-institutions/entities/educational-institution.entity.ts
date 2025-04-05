import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResearchArticleDocument = HydratedDocument<EducationalInstitution>;

@Schema({
  versionKey: false,
})
export class EducationalInstitution {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;
}

export const EducationalInstitutionSchema = SchemaFactory.createForClass(
  EducationalInstitution,
);
