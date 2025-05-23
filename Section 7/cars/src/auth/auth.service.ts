import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

import { UserLogin, UserRegister } from '../types';
@Injectable()
export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    // Get All Users
    async getAllUsers() {
        return this.authRepository.getAllUsers();
    }

    // Find user by email
    async findUserByEmail(email: string) {
        return this.authRepository.findUserByEmail(email);
    }

    // Log in User
    async loginUser(user: UserLogin) {
        return this.authRepository.loginUser(user);
    }

    // Create User
    async createUser(user: UserRegister) {
        return this.authRepository.createUser(user);
    }
}
