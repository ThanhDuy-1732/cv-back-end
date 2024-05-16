// Utilities
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type AwardDocument = HydratedDocument<Award>;

@Schema()
export class Award {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: ObjectId;

  @Prop({ type: String })
  time: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  location: string;

  @Prop({ type: String })
  position: string;
}

export const AwardSchema = SchemaFactory.createForClass(Award);
