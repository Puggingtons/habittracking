import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient, User } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns user with username', () => {
    const username = 'testusername';
    const testUser: User = {
      id: 0,
      password: 'asdasd',
      username: username,
    };

    prisma.user.findFirst.mockResolvedValue(testUser);

    expect(service.findOne(username)).resolves.toBe(testUser);
  });

  it('call db create on creating new user', async () => {
    const username = 'testusername';
    const password = 'password';

    const mockCreate = jest.fn();

    prisma.user.create.mockImplementation(mockCreate);

    await service.create(username, password);

    expect(mockCreate).toBeCalled();
  });

  it('calls db create on creating new user with correct args', async () => {
    const username = 'testusername';
    const password = 'password';

    const mockCreate = jest.fn();

    prisma.user.create.mockImplementation(mockCreate);

    await service.create(username, password);

    expect(mockCreate).toHaveBeenCalledWith({ data: { username, password } });
  });

  it('throws error when username already exists', async () => {
    const username = 'testusername';
    const password = 'password';
    const testUser: User = {
      id: 0,
      password: 'asdasd',
      username: username,
    };

    prisma.user.findFirst.mockResolvedValue(testUser);

    expect(service.create(username, password)).rejects.toThrow(
      'User with this name already exists',
    );
  });
});
