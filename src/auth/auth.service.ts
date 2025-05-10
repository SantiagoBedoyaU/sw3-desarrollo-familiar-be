import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { RecoveryCodeRepository } from './recovery-code.repository';
import { MailService } from 'src/mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly recoveryCodeRepository: RecoveryCodeRepository,
    private readonly emailService: MailService,
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

    const accessToken = this.jwtService.sign({
      sub: user.id,
      role: user.role,
    });
    return {
      accessToken,
      userRole: user.role,
    };
  }

  async recoverPassword(recoverPasswordDto: RecoverPasswordDto) {
    const user = await this.usersService.findOneByEmail(
      recoverPasswordDto.email,
    );
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await this.recoveryCodeRepository.create({
      code,
      userId: user.id,
    });
    await this.emailService.sendRecoveryPasswordEmail(
      user.name,
      user.email,
      code,
    );
    return {
      message: 'Se ha enviado un correo para recuperar la contraseña',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const recoveryCode = await this.recoveryCodeRepository.findOne({
      code: resetPasswordDto.code,
    });
    const now = new Date();
    if (!recoveryCode || now > recoveryCode.expiresAt) {
      throw new BadRequestException('Expired recovery code');
    }
    const userId = recoveryCode.userId;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(resetPasswordDto.newPassword, salt);
    await this.usersService.update(userId, {
      password: hashPassword,
    });
    await this.recoveryCodeRepository.delete({
      code: recoveryCode.code,
      userId: recoveryCode.userId,
    });
    return {
      message: 'Contraseña restablecida con exito',
    };
  }

  private async verifyPassword(
    plainPassword: string,
    encryptedPassword: string,
  ) {
    return bcrypt.compare(plainPassword, encryptedPassword);
  }
}
