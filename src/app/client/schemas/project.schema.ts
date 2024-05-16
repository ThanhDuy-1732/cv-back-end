// Utilities
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: ObjectId;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  time: string;

  @Prop({ type: [String], required: false })
  url?: string[];

  @Prop({ type: String, required: false })
  company?: string;

  @Prop({ type: String })
  position: string;

  @Prop({ type: [String] })
  mainTechs: string[];

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number })
  numberOfMember: number;

  @Prop({ type: [String] })
  technologyInUse: string[];

  @Prop({ type: [String] })
  responsibilitiesAndAchievement: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
