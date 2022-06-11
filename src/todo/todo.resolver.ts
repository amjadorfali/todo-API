import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotFoundException, UseFilters } from '@nestjs/common';

import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CurrentUser } from 'src/auth/decorators/current-user-decorater';
import { AuthenticatedUser } from 'src/auth/auth.interfaces';
import { AllExceptionsFilter, MongoExceptionFilter } from 'src/handlers/exceptions';
import { CreateTodoInput, FindPaginatedTodosInput, UpdateTodoInput } from './dto';

@UseFilters(MongoExceptionFilter, AllExceptionsFilter)
@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'fetchTodos' })
  findAll(@CurrentUser() user: AuthenticatedUser, @Args('paginationInput') paginationInput: FindPaginatedTodosInput) {
    return this.todoService.findAll(user.id, paginationInput.page, paginationInput.limit);
  }

  @Mutation(() => Todo, { name: 'addTodo' })
  create(@Args('createTodoInput') createTodoInput: CreateTodoInput, @CurrentUser() user: AuthenticatedUser) {
    return this.todoService.create(createTodoInput, user.id);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  async update(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    try {
      await this.todoService.findById(updateTodoInput.todoId);
    } catch (e) {
      console.log(JSON.stringify(e));
      throw new NotFoundException();
    }
    return this.todoService.updateByField(updateTodoInput);
  }

  @Mutation(() => String, { name: 'removeFood', nullable: true })
  async remove(@Args('id') id: string) {
    if (!(await this.todoService.findById(id))) throw new NotFoundException();
    await this.todoService.remove(id);
    return 'Okay';
  }
  // @Mutation(() => String, { name: 'removeTodos', nullable: true })
  // async remove(@Args('ids', { type: () => [String] }) ids: string[]) {
  //   for (const id of ids) {
  //     await this.todoService.remove(id);
  //   }
  //   return 'Okay';
  // }

  // @Mutation(() => String, { name: 'removeAllTodos', nullable: true })
  // async batchRemove() {
  //   await this.todoService.deleteAll();
  //   return 'Okay';
  // }
}
