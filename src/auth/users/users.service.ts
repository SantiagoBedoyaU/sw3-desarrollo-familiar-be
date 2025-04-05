import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { MailService } from '../../mail/mail.service';
import * as bcrypt from 'bcrypt';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private model: Model<User>,
    private readonly mailService: MailService,
  ) {}


  async create(createUserDto: CreateUserDto) {
    const {name, email, role} = createUserDto;

    //Generate a  password
    const usernamePart = email.split('@')[0];
    const randomNumbers = Math.floor(Math.random() * 1000);
    const password = `${usernamePart}${randomNumbers}`;

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //save user to the database
    const newUser = new this.model({
      name,
      email,
      password: hashedPassword,
      role
    });

    try {
          //Send email to the user with the password, whith the email and link of acces
          await this.mailService.sendWelcomeEmail(name, email, password);
          await newUser.save();
          return{
            message: 'User created successfully',
            user:{
              name : newUser.name,
              email: newUser.email,
              role : newUser.role,
            }
          }
 
    } catch (error) {
      
      throw new BadRequestException('dont create user or send email');
      
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
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
