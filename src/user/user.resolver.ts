import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { TodoService } from 'src/todo/todo.service';
import { Todo } from 'src/todo/entities/todo.entity';
import { GetUserInput } from './dto/get-user.input';
import { Public } from 'src/auth/decorators/public-routes.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user-decorater';
import { AuthenticatedUser } from 'src/auth/auth.interfaces';
import { GetUserByUserNameInput } from './dto/get-user-by-user-name.input';
import { GetUserByEmailInput } from './dto/get-user-by-email.input';
import { UseFilters } from '@nestjs/common';
import { MongoExceptionFilter, AllExceptionsFilter } from 'src/handlers/exceptions';

@UseFilters(AllExceptionsFilter, MongoExceptionFilter)
@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly todoService: TodoService) {}

  @Public()
  @Mutation(() => UserEntity, { name: 'signUp' })
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
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
  getTodos(@Parent() user: UserEntity) {
    return this.todoService.findAll(user.id);
  }

  @Mutation(() => UserEntity, { name: 'updateUserDetails' })
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput, @CurrentUser() user: AuthenticatedUser) {
    return this.userService.update(user.id, updateUserInput);
  }

  // @Mutation(() => UserEntity)
  // async removeUser(@Args('userName') userName: string) {
  //   return this.userService.remove(userName);
  // }
}

// import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// import { UserService } from './user.service';
// import { UserType } from './user.dto';
// // import bcrypt from 'bcryptjs';
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const bcrypt = require('bcryptjs');

// const password = 'mypass123';
// const saltRounds = 10;
// @Resolver('User')
// export class UserResolver {
//   constructor(private readonly userService: UserService) {}

//   @Query(() => [UserType])
//   async users() {
//     return this.userService.findAll();
//   }
//   @Mutation(() => UserType)
//   async createUser(@Args('input') input: UserType) {
//     const updatedInput = '';

//     bcrypt.genSalt(saltRounds, function (saltError, salt) {
//       if (saltError) {
//         throw saltError;
//       } else {
//         bcrypt.hash(password, salt, function (hashError, hash) {
//           if (hashError) {
//             throw hashError;
//           } else {
//             console.log(hash);
//             //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
//           }
//         });
//       }
//     });
//     // return this.userService.create(input);
//   }
// }
