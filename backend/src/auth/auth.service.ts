import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<any /* TODO find type*/> {
    const user = await this.usersService.findOne(username);

    if (user.password !== password) {
      throw new UnauthorizedException();
    }
  }
}
