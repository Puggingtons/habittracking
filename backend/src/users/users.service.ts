import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({ where: { username } });
  }

  async create(username: string, password: string): Promise<User> {
    const user = await this.findOne(username);

    if (user) {
      throw 'User with this name already exists';
    }

    return await this.prisma.user.create({
      data: { username: username, password: password },
    });
  }
}
