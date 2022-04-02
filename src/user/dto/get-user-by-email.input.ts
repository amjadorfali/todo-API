import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetUserByEmailInput {
  @Field({ nullable: false })
  email!: string;
}
