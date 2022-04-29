import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput {
  @Field({ nullable: false })
  todoId!: string;

  @Field({ nullable: true })
  action?: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  isDone?: boolean;
}
