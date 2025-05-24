import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  NotFoundException,
  Patch,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';

// Services
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

// DTOs
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { TransformResponse } from '../interceptors/transform.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
@TransformResponse()
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    if (email) {
      const users = await this.usersService.find(email);
      if (!users || users.length === 0) {
        throw new NotFoundException('User not found');
      }
      return users[0];
    }
    
    const users = await this.usersService.findAll();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersService.update(parseInt(id), body);
    Object.assign(user, body);
    
    return {
      message: 'User updated successfully',
      data: user
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersService.remove(parseInt(id));
    
    return {
      message: 'User deleted successfully',
      data: user
    };
  }
}
