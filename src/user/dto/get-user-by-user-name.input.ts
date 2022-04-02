import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetUserByUserNameInput {
  @Field({ nullable: false })
  userName!: string;
}
