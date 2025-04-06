import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PracticeReportDocument = HydratedDocument<PracticeReport>;

@Schema({
  versionKey: false,
})
export class PracticeReport {}

export const PracticeReportSchema =
  SchemaFactory.createForClass(PracticeReport);
