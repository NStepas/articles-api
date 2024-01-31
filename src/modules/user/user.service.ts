import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';

import { User, UserDocument } from './schema/user.schema';
import { SignInDto } from 'src/core/auth/dto/sign-in.dto';

@Injectable()
export class UserService {
  protected readonly logger = new Logger(UserService.name);
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: SignInDto, password: string) {
    try {
      return this.userModel.create({ ...createUserDto, password });
    } catch (e) {
      this.logger.error('Something going wrong. Cannot create user.', e);
    }
  }

  async getUser(email: string): Promise<User> {
    try {
      this.logger.log(`Getting user from database`);
      return this.userModel.findOne({ email }).exec();
    } catch (e) {
      this.logger.error(
        'Something going wrong. Cannot get users from database'
      );
    }
  }

  async getUserById(id: ObjectId): Promise<User> {
    try {
      this.logger.log(`Getting user from database: ${id}`);
      return this.userModel
        .findById(new Types.ObjectId(id.toString()))
        .select('-password')
        .exec();
    } catch (e) {
      this.logger.error(
        'Something going wrong. Cannot get users from database'
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      this.logger.log(`Getting all user from database`);
      return this.userModel.find().populate('books').exec();
    } catch (e) {
      this.logger.error(
        'Something going wrong. Cannot get users from database'
      );
    }
  }
}
