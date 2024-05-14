// Utilities
import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Comment {
  @Directive('@lower')
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  text: string;

  @Field()
  date: Date;
}
