import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, SortOrder } from 'mongoose';
import { Post } from './entities/post.entity';
import { BaseRepository } from 'src/shared/repository/base-repository';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(@InjectModel(Post.name) model: Model<Post>) {
    super(model);
  }

  async findAll(filter: FilterQuery<Post>, limit: number, page: number) {
    const skip = (page - 1) * limit;

    const sort: { [key: string]: SortOrder } = { createdAt: -1 };

    const [data, totalItems] = await Promise.all([
      this.model.find(filter).limit(limit).skip(skip).sort(sort).exec(),
      this.model.countDocuments(filter).exec(),
    ]);
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
    };
  }
}
