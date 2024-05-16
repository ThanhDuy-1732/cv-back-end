// Utilities
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type InformationDocument = HydratedDocument<Information>;

export enum InformationTitleEnum {
  dob = 'DOB',
  phone = 'Phone',
  email = 'Email',
  github = 'Github',
  address = 'Address',
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
