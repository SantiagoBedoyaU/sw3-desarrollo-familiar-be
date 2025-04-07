// src/users/users.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { BaseService } from 'src/shared/service/base-service';
import { User } from './entities/user.entity';
import { UsersRepository } from 'src/auth/users/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService extends BaseService<User, UsersRepository> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mailService: MailService,
  ) {
    super(usersRepository);
  }

  async create(createUserDto: CreateUserDto) {
    const { name, email, role } = createUserDto;

    //validate email not registered
    const existingUser = await this.usersRepository.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const usernamePart = email.split('@')[0];
    const randomNumbers = Math.floor(Math.random() * 1000);
    const password = `${usernamePart}${randomNumbers}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    try {
      await this.usersRepository.create(newUser as User);
      await this.mailService.sendWelcomeEmail(name, email, password);

      return {
        message: 'User created successfully',
        user: {
          name,
          email,
          role,
        },
      };
    } catch (error) {
      throw new BadRequestException('Error creating user', error.message);
    }
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOneByEmail(email);
  }
}
