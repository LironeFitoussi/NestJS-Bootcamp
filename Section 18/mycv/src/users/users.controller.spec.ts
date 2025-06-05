import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let userServiceMock: Partial<UsersService>;
  let authServiceMock: Partial<AuthService>;

  beforeEach(async () => {
    userServiceMock = {
      findOne(id: number) {
        return Promise.resolve({ id, email: "asd@asd.com", password: "pass123" } as User)
      },
      find(email) {
        return Promise.resolve([
          { id: 1, email, password: "pass" } as User
        ])
      },
      // },
      // update(id, attrs) {

      // },
    };
    authServiceMock = {
      signup(email: string, password: string) {
        return Promise.resolve({
          id: Math.floor(Math.random() * 99999), email, password
        } as User)
      },
      signin(email: string, password: string) {
        return Promise.resolve({id: 1, email, password} as User)
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: userServiceMock
        },
        {
          provide: AuthService,
          useValue: authServiceMock
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("findAllUsers returns a list of users with the givern email", async () => {
    const users = await controller.findAllUsers('asdf@asdf.com');
    
    expect(users.length).toEqual(1)
    expect(users[0].email).toEqual('asdf@asdf.com')
  }); 

  it("findUser returns a single user with a given id", async () => {
    const user = await controller.findUser('1')
    expect(user).toBeDefined();
  });


  it('findUser throws an error if user with given id is not found', async () => {
    userServiceMock.findOne= () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('signin updates session objects and returns user', async () => {
    const session = { userId: -10};
    const user = await controller.signin(
      {email: "asd@asd.com", password: "123123123"},
      session
    )
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1)
  })
});
