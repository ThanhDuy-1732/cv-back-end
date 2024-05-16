// Utilities
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type WorkExperienceDocument = HydratedDocument<WorkExperience>;

@Schema()
export class WorkExperience {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: ObjectId;

  @Prop({ type: String })
  time: string;

  @Prop({ type: String })
  company: string;

  @Prop({ type: String })
  position: string;

  @Prop({ type: [String] })
  description: string[];
}

export const WorkExperienceSchema =
  SchemaFactory.createForClass(WorkExperience);
