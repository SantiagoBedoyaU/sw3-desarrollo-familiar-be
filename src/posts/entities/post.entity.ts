import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
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

export const PostSchema = SchemaFactory.createForClass(Post);
