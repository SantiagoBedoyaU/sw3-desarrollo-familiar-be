import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PostDocument = Posts & Document;

@Schema({ timestamps: true })
export class Posts {
  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  eventDate?: Date;

  @Prop({ required: true })
  description: string;

  @Prop()
  externalLink?: string;

  @Prop({ default: false })
  approved: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Date, default: () => new Date() })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Posts);
