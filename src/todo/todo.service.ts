import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import { UpdateTodoInput, CreateTodoInput } from './dto';
import { Todo } from './entities/todo.entity';
import { TodoDocument } from './todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoInput: CreateTodoInput, userId: string): Promise<TodoDocument> {
    return await new this.todoModel({
      ...createTodoInput,
      user: userId,
    }).save();
  }

  async findAll(id: string, page: number, limit: number): Promise<TodoDocument[]> {
    return await this.todoModel
      .find({ user: id })
      .sort('-created_at')
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async findById(id: string): Promise<TodoDocument | null> {
    return await this.todoModel.findById(id).exec();
  }

  async updateByField(toUpdate: UpdateTodoInput): Promise<TodoDocument | null> {
    const { todoId, ...newValues } = toUpdate;
    const aliases = this.translateAliases({
      ...newValues,
    });
    return await this.todoModel.findByIdAndUpdate(todoId, aliases, { new: true });
  }

  async remove(id: string): Promise<TodoDocument | null> {
    return await this.todoModel.findByIdAndDelete(id).exec();
  }

  async deleteAllForUser(userId: string): Promise<string> {
    await this.todoModel.deleteMany({ user: userId }).exec();
    return '';
  }

  translateAliases(input: Partial<UpdateTodoInput>): TodoDocument {
    return this.todoModel.translateAliases(input);
  }
}
