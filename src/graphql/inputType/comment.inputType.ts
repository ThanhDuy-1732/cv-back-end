import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInputType {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  text: string;
}
