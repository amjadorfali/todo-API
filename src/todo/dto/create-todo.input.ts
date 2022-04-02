import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field({ nullable: false })
  action!: string;
}
