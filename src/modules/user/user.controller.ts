import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { User } from './schema/user.schema';
import { UserService } from './user.service';
import { JwtGuard } from 'src/core/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  @UseGuards(JwtGuard)
  async getUser(@Param('id') id: ObjectId): Promise<User> {
    return this.userService.getUserById(id);
  }
}
