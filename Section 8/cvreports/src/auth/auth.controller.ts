import { Body, Controller, Get, Post, Query, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LogUserDto } from './dtos/log-user-dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    // Get All Users
    @Get('users')
    @UseGuards(AuthGuard)
    async getAllUsers() {
        return this.authService.getAllUsers();
    }

    // Register User
    @Post('register')
    async createUser(@Body() user: CreateUserDto) {
        const newUser = await this.authService.createUser(user);
        const userWithoutPassword = { 
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            isAdmin: newUser.isAdmin,
            isVerified: newUser.isVerified
        };
        return { message: 'User registered successfully', user: userWithoutPassword };
    }

    // Login User
    @Post('login')
    async loginUser(@Body() user: LogUserDto, @Session() session: any) {
        const loggedInUser = await this.authService.loginUser(user);
        session.userId = loggedInUser.id;
        
        const userWithoutPassword = { 
            id: loggedInUser.id,
            email: loggedInUser.email,
            firstName: loggedInUser.firstName,
            lastName: loggedInUser.lastName,
            isAdmin: loggedInUser.isAdmin,
            isVerified: loggedInUser.isVerified
        };
        
        return { 
            message: 'Login successful', 
            user: userWithoutPassword 
        };
    }

    // Find user by email
    @Get('user')
    async findUserByEmail(@Query('email') email: string) {
        return this.authService.findUserByEmail(email);
    }
}
