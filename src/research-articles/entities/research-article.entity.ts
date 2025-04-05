import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResearchArticleDocument = HydratedDocument<ResearchArticle>;

@Schema({
  versionKey: false,
})
export class ResearchArticle {
  @Prop({
    unique: true,
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  year: string;

  @Prop({
    type: [String],
    required: true,
  })
  authors: string[];

  @Prop({
    required: true,
  })
  primaryThematicAxis: string;

  @Prop({
    required: true,
  })
  secondaryThematicAxis: string;

  @Prop({
    required: true,
  })
  keywords: string[];

  @Prop({
    required: true,
  })
  summary: string;

  @Prop({ required: true })
  fileAddress?: string;

  @Prop({ default: 0 })
  counter?: number;

  @Prop({ default: 0 })
  downloadCounter?: number;
}

export const ResearchArticleSchema =
  SchemaFactory.createForClass(ResearchArticle);
