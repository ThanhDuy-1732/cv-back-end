// Utilities
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type InformationDocument = HydratedDocument<Information>;

export enum InformationTitleEnum {
  DOB = 'DOB',
  Phone = 'Phone',
  Email = 'Email',
  Github = 'Github',
  Address = 'Address',
}

@Schema()
export class Information {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: ObjectId;

  @Prop({ type: String, enum: InformationTitleEnum })
  title: string;

  @Prop({ type: String })
  content: string;
}

export const InformationSchema = SchemaFactory.createForClass(Information);
