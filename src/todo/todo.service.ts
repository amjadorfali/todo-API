import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './entities/todo.entity';
import { TodoDocument } from './todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoInput: CreateTodoInput, userId: string): Promise<TodoDocument> {
    const createdTodo = new this.todoModel({
      ...createTodoInput,
      user: userId,
    });
    return await createdTodo.save();
  }

  async findAll(id: string): Promise<TodoDocument[]> {
    return await this.todoModel.find({ user: id }).exec();
  }

  // async findOne(id: string): Promise<TodoDocument> {
  //   try {
  //     const todo = await this.todoModel.findById(String(id)).exec();
  //     return todo;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  async update(updateTodoInput: UpdateTodoInput): Promise<TodoDocument | null> {
    return await this.todoModel
      .findByIdAndUpdate(
        updateTodoInput.todoId,
        {
          action: updateTodoInput.action,
        },
        { new: true },
      )
      .exec();
  }

  async remove(id: string): Promise<TodoDocument | null> {
    return await this.todoModel.findByIdAndDelete(id).exec();
  }
}
