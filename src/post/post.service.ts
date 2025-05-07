import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { BaseService } from '../shared/service/base-service';
import { Posts } from './entities/post.entity';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Types } from 'mongoose';
import { Roles } from 'src/auth/users/entities/user.entity';
import { PostQueryParams } from './dto/post-query-params.dto';

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

  async findAll(queryParams: PostQueryParams) {
    const query = {};

    return this.postRepository.findAll(
      query,
      queryParams.limit,
      queryParams.page,
    );
  }

  async findOne(id: string): Promise<Posts> {
    const post = await this.postRepository.findOne({ _id: id });
    if (!post) {
      throw new NotFoundException(`No se encontró el post con ID ${id}`);
    }
    return post;
  }

  async update(id: string, updatePostDto: Partial<Posts>) {
    return this.postRepository.update({ _id: id }, updatePostDto);
  }

  async remove(id: string): Promise<Posts> {
    const result = await this.postRepository.findOne({ _id: id });
    if (!result) {
      throw new NotFoundException('Post not found');
    }
    await this.postRepository.delete({ _id: id });
    return result;
  }
}
