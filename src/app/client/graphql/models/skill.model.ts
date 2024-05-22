// Utilities
import { Schema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String)
  _id: Schema.Types.ObjectId;

  @Field()
  type: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [String])
  skills: string[];
}
