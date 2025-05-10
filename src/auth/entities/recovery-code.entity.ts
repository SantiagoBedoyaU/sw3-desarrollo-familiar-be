import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecoveryCodeDocument = HydratedDocument<RecoveryCode>;

@Schema({ versionKey: false })
export class RecoveryCode {
  @Prop({
    type: String,
    required: true,
  })
  code: string;

  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  @Prop({
    type: Date,
    default: () => {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 15);
      return now;
    },
  })
  expiresAt?: Date;
}

export const RecoveryCodeSchema = SchemaFactory.createForClass(RecoveryCode);