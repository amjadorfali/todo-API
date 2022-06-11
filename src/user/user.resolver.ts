import { Resolver, Mutation, Args, ResolveField, Parent, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { Public } from 'src/auth/decorators/public-routes.decorator';
import { UseFilters } from '@nestjs/common';
import { MongoExceptionFilter, AllExceptionsFilter } from 'src/handlers/exceptions';
import { CurrentUser } from 'src/auth/decorators/current-user-decorater';
import { AuthenticatedUser } from 'src/auth/auth.interfaces';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserInput } from './dto/update-user.input';
import { TodoService } from 'src/todo/todo.service';
import { Todo } from 'src/todo/entities/todo.entity';
import { GetUserByUserNameInput } from './dto/get-user-by-user-name.input';
import { GetUserByEmailInput } from './dto/get-user-by-email.input';
import { FindPaginatedTodosInput } from 'src/todo/dto';
import { LoginResponseDTO } from 'src/auth/dtos';

@UseFilters(AllExceptionsFilter, MongoExceptionFilter)
@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly todoService: TodoService, private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => LoginResponseDTO, { name: 'signUp' })
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    await this.userService.create(createUserInput);
    const res = await this.authService.login(createUserInput);
    return res;
  }

  @Public()
  @Query(() => UserEntity, { name: 'getUserByUserName', nullable: true })
  findByUserName(@Args('user') user: GetUserByUserNameInput) {
    return this.userService.findOneByField(user.userName, 'user_name');
  }

  @Public()
  @Query(() => UserEntity, { name: 'getUserByEmail', nullable: true })
  findByEmail(@Args('user') user: GetUserByEmailInput) {
    return this.userService.findOneByField(user.email, 'email');
  }

  @ResolveField('todos', () => [Todo])
  getTodos(@Parent() user: UserEntity, @Args('paginationInput') paginationInput: FindPaginatedTodosInput) {
    return this.todoService.findAll(user.id, paginationInput.page, paginationInput.limit);
  }

  @Mutation(() => UserEntity, { name: 'updateUserDetails' })
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput, @CurrentUser() user: AuthenticatedUser) {
    return this.userService.update(user.id, updateUserInput);
  }
}

// const authenticate = (user: { role: 'admin' | 'customer' }, role: 'admin' | 'customer') => {
//   if (user.role !== role) throw new UnauthorizedException();
//   return;
// };
