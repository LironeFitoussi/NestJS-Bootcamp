import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { LogUserDto } from './dtos/log-user-dto';
@Injectable()
export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    // Get All Users
    async getAllUsers() {
        return this.authRepository.getAllUsers();
    }

    // Find user by email
    async findUserByEmail(email: string) {
        const user = await this.authRepository.findUserByEmail(email);
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }
    
    // Find user by ID
    async findUserById(id: number) {
        const user = await this.authRepository.findUserById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    // Log in User
    async loginUser(userDto: LogUserDto) {
        const user = await this.authRepository.loginUser(userDto);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }

    // Create User
    async createUser(userDto: CreateUserDto) {
        const existingUser = await this.authRepository.findUserByEmail(userDto.email);
        if (existingUser) {
            throw new UnauthorizedException('Email already in use');
        }
        return this.authRepository.createUser(userDto);
    }
}
