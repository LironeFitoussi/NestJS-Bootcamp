import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { LogUserDto } from './dtos/log-user-dto';

@Injectable()
export class AuthRepository {
    constructor(
        @InjectRepository(User)
        private repo: Repository<User>
    ) {}

    // Get All Users
    async getAllUsers() {
        return this.repo.find();
    }

    // Find user by email
    async findUserByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
    }

    // Find user by id
    async findUserById(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    // Log in User
    async loginUser(user: LogUserDto) {
        return this.repo.findOne({ 
            where: { 
                email: user.email,
                password: user.password
            } 
        });
    }
    
    // Create User
    async createUser(user: CreateUserDto) {
        const newUser = this.repo.create(user);
        return this.repo.save(newUser);
    }
}