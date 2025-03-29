import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResearchArticleDocument = HydratedDocument<ResearchArticle>;

@Schema()
export class ResearchArticle {
  @Prop({
    unique: true,
    required: true,
  })
  title: string;

  @Prop({
    type: [String],
    required: true,
  })
  authors: string[];

  @Prop({
    required: true,
  })
  thematicAxis: string;

  @Prop({
    required: true,
  })
  summary: string;

  @Prop({ required: false })
  fileAddress?: string;
}

export const ResearchArticleSchema =
  SchemaFactory.createForClass(ResearchArticle);
