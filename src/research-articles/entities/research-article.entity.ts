import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { PracticeReport } from 'src/practice-reports/entities/practice-report.entity';
import { ThematicAxis } from 'src/shared/enums/thematic-axis.enum';

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
    enum: ThematicAxis,
  })
  primaryThematicAxis: string;

  @Prop({
    required: false,
    enum: ThematicAxis,
  })
  secondaryThematicAxis?: string;

  @Prop({
    required: true,
  })
  keywords: string[];

  @Prop({
    required: true,
  })
  summary: string;

  @Prop({
    type: mongoose.Schema.ObjectId,
    ref: 'PracticeReport',
    required: false,
  })
  practiceReport?: PracticeReport | any;

  @Prop()
  fileAddress?: string;

  @Prop({ default: 0 })
  counter?: number;

  @Prop({ default: 0 })
  downloadCounter?: number;
}

export const ResearchArticleSchema =
  SchemaFactory.createForClass(ResearchArticle);
