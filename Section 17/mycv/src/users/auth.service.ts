import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // Logic 
    // Check if email is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // Hash the user's password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    // Create a new user and save it
    const user = await this.usersService.create(email, result);
    // Return the user
    return user;
  }

  async signin(email: string, password: string) {
    // Logic
    // Find the user with the email
    const [user] = await this.usersService.find(email);
    // If no user, throw an error
    if (!user) {
      throw new NotFoundException('user not found');
    }

    // If user, compare passwords
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      // If password is incorrect, throw an error
      throw new BadRequestException('bad password');
    }

    // If password is correct, return the user
    return user;
  }
}