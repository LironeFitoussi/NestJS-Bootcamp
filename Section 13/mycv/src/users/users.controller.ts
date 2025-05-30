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
  Session,
  UseGuards
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';

// Services
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

// DTOs
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';

// Interceptors
import { Serialize } from '../interceptors/serialize.interceptor';
import { TransformResponse } from '../interceptors/transform.interceptor';

// Entities
import { User } from './user.entity';

// Decorators
import { CurrentUser } from './decorators/current-user.decorator';

// Guards
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
// @TransformResponse()
 export class UsersController {
  constructor(
    private usersService: UsersService, 
    private authService: AuthService
  ) {}

  // @Get('/colors/:color')
  // async setColor(@Param('color') color: string, @Session() session: any) {
  //   session.color = color;
  // };

  // @Get('/colors')
  // async getColor(@Session() session: any){
  //   return session.color
  // };

  // @Get('/whoami')
  // async whoami(@Session() session: any) {
  //   return this.usersService.findOne(session.userId)
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() user: User){
    return user;
  }

  @Post('/signout')
  async signOut(@Session() session: any) {
    session.userId = null
    return {
      message: 'Signed out successfully'
    }
  }
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id
    return user;
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
      return users;
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
