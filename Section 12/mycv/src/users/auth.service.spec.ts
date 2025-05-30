import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('Auth Service', () => {
    let service: AuthService;
    let userServiceMock: Partial<UsersService>;
    let users: User[];

    beforeEach(async () => {
        users = [];
        userServiceMock = {
            find: (email: string) => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) => {
                const newUser = { id: Math.floor(Math.random() * 999999), email, password } as User;
                users.push(newUser);
                return Promise.resolve(newUser);
            },
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: userServiceMock
                }
            ],
        }).compile();

        service = module.get(AuthService);
    });

    it("can create an instance of auth service", async () => {
        expect(service).toBeDefined();
    });

    it("Creates a new user with salted and hashed password", async () => {
        const user = await service.signup("test@example.com", "pass123");

        expect(user.password).not.toEqual('pass123');
        const [salt, hash] = user.password.split(".");
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with email that is in use', async () => {
        await service.signup('test@example.com', 'pass123');
        await expect(service.signup('test@example.com', 'pass123')).rejects.toThrow(BadRequestException);
    });

    it('throws an error if user tries to signin with an unused email', async () => {
        await expect(
            service.signin('nonexistent@example.com', 'pass123'),
        ).rejects.toThrow(NotFoundException);
    });

    it('returns a user if correct password is provided', async () => {
        await service.signup("test@example.com", "pass123");
        const user = await service.signin("test@example.com", "pass123");
        expect(user).toBeDefined();
        expect(user.email).toBe("test@example.com");
    });

    it('throws if an invalid password is provided', async () => {
        await service.signup("test@example.com", "pass123");
        await expect(
            service.signin("test@example.com", "wrongpassword"),
        ).rejects.toThrow(BadRequestException);
    });
});