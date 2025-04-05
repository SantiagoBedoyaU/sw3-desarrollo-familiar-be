import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { MailService } from '../../mail/mail.service';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private model: Model<User>,
    private readonly mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, role } = createUserDto;

    //Generate a  password
    const usernamePart = email.split('@')[0];
    const randomNumbers = Math.floor(Math.random() * 1000);
    const password = `${usernamePart}${randomNumbers}`;

    //Hash the password whit salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //save user to the database
    const newUser = new this.model({
      name,
      email,
      password: hashedPassword,
      role,
    });

    try {
      //first save the user to the database
      await newUser.save();

      //Send email to the user with the password, whith the email and link of acces
      await this.mailService.sendWelcomeEmail(name, email, password);
      return {
        message: 'User created successfully',
        user: {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      };
    } catch (error) {
      throw new BadRequestException('dont email sent', error.message);
    }
  }

  async findAll() {}

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  findOneByEmail(email: string) {
    return this.model.findOne({ email });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
