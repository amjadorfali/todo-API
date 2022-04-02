import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoModule } from 'src/todo/todo.module';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from './user.schema';

@Module({
  providers: [UserResolver, UserService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), TodoModule],

  exports: [UserService],
})
export class UserModule {}
