// Utilities
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type OverviewDocument = HydratedDocument<Overview>;

@Schema()
export class Overview {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: ObjectId;

  @Prop({ type: String })
  value: string;
}

export const OverviewSchema = SchemaFactory.createForClass(Overview);
