import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schema/user.schema';
import { hash } from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';
import { CreateUserRequest } from './dto/create-user.request';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
  async create(data: CreateUserRequest) {
    await new this.userModel({
      ...data,
      password: await hash(data.password, 10),
    }).save();
  }
  async getUser(query: FilterQuery<User>) {
    const user = await this.userModel.findOne(query);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.toObject();
  }
  async getUsers() {
    return this.userModel.find({});
  }
  async updateUser(query: FilterQuery<User>, data: UpdateQuery<User>) {
    return this.userModel.findOneAndUpdate(query, data);
  }
  async getOrCreateUser(data: CreateUserRequest) {
    const user = await this.userModel.findOne({ email: data.email });
    if (user) {
      return user;
    }
    return this.create(data);
  }
}
