import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
// Services
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

// Interceptors
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

// Entities
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, {
    provide: APP_INTERCEPTOR,
    useClass: CurrentUserInterceptor
  }],
})
export class UsersModule {}
