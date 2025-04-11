import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type PracticeReportDocument = HydratedDocument<PracticeReport>;

@Schema({
  versionKey: false,
})
export class PracticeReport {
  @Prop({
    required: true,
    unique: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  period: string;

  @Prop({
    type: [String],
    required: true,
  })
  authors: string[];

  @Prop({
    type: [String],
    required: true,
  })
  keywords: string[];

  @Prop({
    required: true,
  })
  primaryThematicAxis: string;

  @Prop()
  secondaryThematicAxis?: string;

  @Prop({ type: Types.ObjectId, ref: 'EducationalInstitution', required: true })
  institution: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ResearchArticle',
    required: false,
  })
  relatedArticle?: string;

  @Prop({
    required: true,
  })
  fileAddress: string;

  @Prop({ default: 0 })
  counter?: number;

  @Prop({ default: 0 })
  downloadCounter?: number;
}

export const PracticeReportSchema =
  SchemaFactory.createForClass(PracticeReport);
