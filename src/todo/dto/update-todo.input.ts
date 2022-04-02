import { CreateTodoInput } from './create-todo.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field({ nullable: false })
  action!: string;

  @Field({ nullable: false })
  todoId!: string;
}
