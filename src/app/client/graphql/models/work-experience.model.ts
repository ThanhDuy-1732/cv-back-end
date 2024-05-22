// Utilities
import { Schema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WorkExperience {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String)
  _id: Schema.Types.ObjectId;

  @Field()
  time: string;

  @Field()
  company: string;

  @Field()
  position: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [String])
  description: string[];
}
