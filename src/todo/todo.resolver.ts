import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { CurrentUser } from 'src/auth/decorators/current-user-decorater';
import { AuthenticatedUser } from 'src/auth/auth.interfaces';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => Todo, { name: 'addTodo' })
  create(@Args('createTodoInput') createTodoInput: CreateTodoInput, @CurrentUser() user: AuthenticatedUser) {
    return this.todoService.create(createTodoInput, user.id);
  }

  @Query(() => [Todo], { name: 'fetchTodos' })
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.todoService.findAll(user.id);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  update(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => [Todo], { name: 'removeTodos', nullable: true })
  remove(@Args('ids', { type: () => [String] }) ids: string[]) {
    const removedTodos: Promise<Partial<Todo> | null>[] = [];
    for (const id of ids) {
      removedTodos.push(this.todoService.remove(id));
    }
    return removedTodos;
  }
}
