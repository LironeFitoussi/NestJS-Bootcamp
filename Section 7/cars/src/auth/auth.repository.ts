import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

import { User, UserRegister, UserLogin } from '../types';

@Injectable()
export class AuthRepository {
    private usersFilePath = 'db/users.json';

    private async readUsersFile() {
        const usersData = await readFile(this.usersFilePath, 'utf-8');
        const parsed = JSON.parse(usersData);
        return parsed.users as User[];
    }

    private async writeUsersFile(users: User[]) {
        const data = { users };
        await writeFile(this.usersFilePath, JSON.stringify(data, null, 2));
    }

    // Get All Users
    async getAllUsers() {
        return this.readUsersFile();
    }

    // Find user by email
    async findUserByEmail(email: string) {
        const users = await this.readUsersFile();
        return users.find((user: User) => user.email === email);
    }

    // Log in User
    async loginUser(user: UserLogin) {
        const users = await this.readUsersFile();
        return users.find((u: User) => u.email === user.email && u.password === user.password);
    }
    // Create User
    async createUser(user: UserRegister) {
        const users = await this.readUsersFile();
        const newUser = {
            ...user,
            id: Math.random().toString(36).substring(2, 15), // Generate a random ID
        };
        users.push(newUser);
        await this.writeUsersFile(users);
        return newUser;
    }
}