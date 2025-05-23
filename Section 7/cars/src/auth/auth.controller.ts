import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LogUserDto } from './dtos/log-user-dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    // Get All Users
    @Get('users')
    async getAllUsers() {
        return this.authService.getAllUsers();
    }

    // Register User
    @Post('register')
    async createUser(@Body() user: CreateUserDto) {
        const newUser = await this.authService.createUser(user);
        return { message: 'User registered successfully', user: newUser };
    }

    // Login User
    @Post('login')
    async loginUser(@Body() user: LogUserDto) {
        const { email, password } = user;
        const foundUser = await this.authService.loginUser({ email, password });
        if (!foundUser) {
            return { message: 'Invalid email or password' };
        }
        delete foundUser.password; // Remove password from the response
        return { message: 'Login successful', user: foundUser };
    }

    // Find user by email
    @Get('user')
    async findUserByEmail(@Query('email') email: string) {
        return this.authService.findUserByEmail(email);
    }
}
