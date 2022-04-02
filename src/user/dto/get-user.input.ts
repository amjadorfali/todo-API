import { Field, ArgsType, InputType } from '@nestjs/graphql';

@InputType()
export class GetUserInput {
  @Field({ nullable: false })
  id!: string;
}
