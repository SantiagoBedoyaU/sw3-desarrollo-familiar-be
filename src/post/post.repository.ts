import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts } from './entities/post.entity';
import { BaseRepository } from 'src/shared/repository/base-repository';

@Injectable()
export class PostRepository extends BaseRepository<Posts> {
  constructor(@InjectModel(Posts.name) model: Model<Posts>) {
    super(model);
  }
}
