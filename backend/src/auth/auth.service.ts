import * as bcrypt from 'bcrypt';

import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const correctPassword = await this.checkPassword(password, user?.password);

    if (!correctPassword) {
      throw new UnauthorizedException('Wrong password');
    }

    const payload = { id: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.create(
        username,
        await this.hashPassword(password),
      );

      return { id: user.id, username: user.username };
    } catch (e) {
      throw new ForbiddenException((e as Error).message);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const SALT_ROUNDS = 10;

    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  private async checkPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
