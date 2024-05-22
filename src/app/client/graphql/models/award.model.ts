// Utilities
import { Schema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Award {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String)
  _id: Schema.Types.ObjectId;

  @Field()
  time: string;

  @Field()
  title: string;

  @Field()
  location: string;

  @Field()
  position: string;
}
