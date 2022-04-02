import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserType } from './dto/user';
import { User, UserDocument } from './user.schema';
import { hash } from 'src/hashing/hash';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModal: Model<UserDocument>) {}

  async create(createUserInput: CreateUserInput): Promise<UserDocument> {
    const usersCount = await this.getUsersCount();
    const hashedPassword = await hash(createUserInput.password);

    const createdUser = new this.userModal({
      ...createUserInput,
      password: hashedPassword,
      registration_number: usersCount + 1,
    });
    return await createdUser.save();
  }

  async getUsersCount(): Promise<number> {
    return await this.userModal.countDocuments();
  }

  async findById(userId: string): Promise<UserDocument | null> {
    return await this.userModal.findById(userId);
  }
  async findOneByField(value: string, field: keyof User): Promise<UserDocument | null> {
    const findBy: { [key in keyof User]?: string } = {};
    findBy[`${field}`] = value;
    const user = this.userModal.findOne(findBy);

    return await user.exec();
  }

  // @UseFilters(MongoExceptionFilter)
  async update(userId: string, updateUserInput: UpdateUserInput): Promise<UserDocument | null> {
    const toUpdate = this.translateAliases({
      ...updateUserInput,
    });

    const updated = await this.userModal
      .findByIdAndUpdate(userId, toUpdate, {
        useFindAndModify: false,
        new: true,
      })
      .exec();

    return updated;
  }

  translateAliases(input: Partial<UserType>): UserDocument {
    return this.userModal.translateAliases(input);
  }
}
