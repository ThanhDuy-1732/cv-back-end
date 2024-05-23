// Utilities
import { Schema } from 'mongoose';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Project {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String)
  _id: Schema.Types.ObjectId;

  @Field()
  name: string;

  @Field()
  time: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [String], { nullable: true })
  url?: string[];

  @Field({ nullable: true })
  company?: string;

  @Field()
  position: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [String])
  mainTechs: string[];

  @Field()
  description: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  numberOfMember: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [String])
  technologyInUse: string[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [String])
  responsibilitiesAndAchievement: string[];
}
