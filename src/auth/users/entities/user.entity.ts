import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Roles {
  Admin = 1,
  Teacher,
  Student,
}

@Schema({
  toJSON: {
    transform(doc, ret) {
      delete ret.__v;
      delete ret.password;
      return ret;
    },
  },
  versionKey: false,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: Roles })
  role: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
