// Utilities
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type EducationDocument = HydratedDocument<Education>;

@Schema()
export class Education {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: ObjectId;

  @Prop({ type: String })
  time: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  score: string;

  @Prop({ type: String, required: false })
  location: string;

  @Prop({ type: [String], required: false })
  subInfo: string[];
}

export const EducationSchema = SchemaFactory.createForClass(Education);
