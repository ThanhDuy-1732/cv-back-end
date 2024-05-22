// Utilities
import { Schema } from 'mongoose';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

// Enums
import { InformationTitleEnum } from 'src/app/client/schemas/information.schema';

registerEnumType(InformationTitleEnum, {
  name: 'InformationTitleEnum',
});

@ObjectType()
export class Information {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String)
  _id: Schema.Types.ObjectId;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field()
  title: string;

  @Field()
  content: string;
}
