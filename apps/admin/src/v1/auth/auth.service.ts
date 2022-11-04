import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { checkPassword } from '@libs/common/utils';
import { PayloadDto } from './dto/payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException(`找不到email为${email}的用户`);
    }

    if (!checkPassword(user.password, password)) {
      return null;
    }

    return { ...user, password: undefined }; // 不返回password
  }

  async login(user: User) {
    const payload: PayloadDto = { id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
