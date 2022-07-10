import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserInput } from './dto/create-user.input';
import { UserType } from './dto/user.input';
import { User, UserDocument } from './user.schema';
import { hash } from 'src/handlers/hashing/hash';
import { toMongoRecord } from 'src/helpers/mongo';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModal: Model<UserDocument>) {}

  async create(createUserInput: CreateUserInput): Promise<UserDocument> {
    return await new this.userModal({
      ...createUserInput,
      password: await hash(createUserInput.password),
      registration_number: (await this.getUsersCount()) + 1,
    }).save();
  }

  async getUsersCount(): Promise<number> {
    return await this.userModal.countDocuments();
  }

  async findById(userId: string): Promise<UserDocument | null> {
    return await this.userModal.findById(userId);
  }
  async findOneByField(value: string, field: keyof User): Promise<UserDocument | null> {
    return await this.userModal.findOne(toMongoRecord(value, field)).exec();
  }

  async update(userId: string, updateUserInput: UpdateUserInput): Promise<UserDocument | null> {
    if (updateUserInput.password) updateUserInput.password = await hash(updateUserInput.password);
    return await this.userModal
      .findByIdAndUpdate(
        userId,
        this.translateAliases({
          ...updateUserInput,
        }),
        {
          useFindAndModify: false,
          new: true,
        },
      )
      .exec();
  }

  translateAliases(input: Partial<UserType>): UserDocument {
    return this.userModal.translateAliases(input);
  }
}
