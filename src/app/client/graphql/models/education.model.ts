// Utilities
import { Schema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Education {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String)
  _id: Schema.Types.ObjectId;

  @Field()
  time: string;

  @Field()
  title: string;

  @Field()
  score: string;

  @Field({ nullable: true })
  location?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [String], { nullable: true })
  subInfo: string[];
}
