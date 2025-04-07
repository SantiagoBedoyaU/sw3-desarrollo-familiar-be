// src/users/users.repository.ts
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/repository/base-repository';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) model: Model<User>) {
    super(model);
  }

  
  findOneByEmail(email: string) {
    return this.model.findOne({ email }).exec();
  }
}
