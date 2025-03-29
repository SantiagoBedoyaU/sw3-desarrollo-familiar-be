import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOneByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException('invalid email or password');
    }

    const isValidPassword = await this.verifyPassword(
      signInDto.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('invalid email or password');
    }

    console.log(user);
    const accessToken = this.jwtService.sign({
      sub: user.id,
      role: user.role,
    });
    return {
      accessToken,
      userRole: user.role,
    };
  }

  private async verifyPassword(
    plainPassword: string,
    encryptedPassword: string,
  ) {
    return bcrypt.compare(plainPassword, encryptedPassword);
  }
}
