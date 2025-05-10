import { Injectable, BadRequestException } from '@nestjs/common';
import { BaseService } from '../shared/service/base-service';
import { Posts } from './entities/post.entity';
import { PostRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { Types } from 'mongoose';
import { Roles } from 'src/auth/users/entities/user.entity';

@Injectable()
export class PostService extends BaseService<Posts, PostRepository> {
  constructor(private readonly postRepository: PostRepository) {
    super(postRepository);
  }

  async createPost(
    createPostDto: CreatePostDto,
    user: { sub: string; role: number },
  ): Promise<Posts> {
    const { imageUrl, eventDate, description, externalLink } = createPostDto;

    if (eventDate && new Date(eventDate) < new Date()) {
      throw new BadRequestException(
        'La fecha del evento no puede ser menor a la fecha actual',
      );
    }

    const approved = user.role === Roles.Admin || user.role === Roles.Teacher;

    const post = await this.postRepository.create({
      ...createPostDto,
      imageUrl,
      eventDate: eventDate ? new Date(eventDate) : undefined,
      description,
      externalLink,
      approved,
      createdBy: new Types.ObjectId(user.sub),
      createdAt: new Date(),
    });

    return post;
  }

  async findAll(filter: any, limit: number, page: number) {
    return this.postRepository.findAll(filter, limit, page);
  }
}
