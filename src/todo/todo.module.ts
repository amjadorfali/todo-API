import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './todo.schema';

@Module({
  providers: [TodoResolver, TodoService],
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  exports: [TodoService],
})
export class TodoModule {}
