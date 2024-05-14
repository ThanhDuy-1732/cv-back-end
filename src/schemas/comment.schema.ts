// Utilities
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  text: string;

  @Prop()
  date: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
