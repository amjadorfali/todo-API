import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { LoginInputDTO } from './dtos';
import { UserDocument } from 'src/user/user.schema';
import { AuthenticatedUser, JwtPayload } from './auth.interfaces';
import { compare } from 'src/hashing/hash';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<UserDocument> {
    const user = await this.userService.findOneByField(username, 'user_name');

    if (!user) {
      throw new NotFoundException('userNotFound');
    }
    if (!(await compare(pass, user.password))) {
      throw new BadRequestException('invalidPassword');
    }

    return user;
  }

  async login(user: LoginInputDTO) {
    const userFound = await this.validateUser(user.userName, user.password);
    const payload: JwtPayload = {
      userName: userFound.user_name,
      sub: userFound.registration_number,
      id: userFound.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async currentUser(authUser: AuthenticatedUser): Promise<UserDocument | null> {
    try {
      const user = await this.userService.findById(authUser.id);
      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
