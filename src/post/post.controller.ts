import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './entities/post.entity';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/users/entities/user.entity';
import { AllowedRoles } from 'src/auth/decorators/roles.decorator';
import { PostQueryParams } from './dto/post-query-params.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: Request,
  ): Promise<Posts> {
    const user = req['user'];

    return this.postService.createPost(createPostDto, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req: any, @Query() queryParams: PostQueryParams) {
    const user = req.user;
    const role = user?.role;

    const filter: any = {};

    if (!role || role === Roles.Student) {
      filter.approved = true;
    }

    const result = await this.postService.findAll(
      filter,
      queryParams.limit,
      queryParams.page,
    );

    if (result.data.length === 0) {
      return {
        message: 'No se encontraron publicaciones.',
        showDefaultImage: true,
      };
    }

    return result;
  }

  @Get('public')
  async findAllPublic(@Query() queryParams: PostQueryParams) {
    const filter = { approved: true };

    const result = await this.postService.findAll(
      filter,
      queryParams.limit,
      queryParams.page,
    );

    if (result.data.length === 0) {
      return {
        message: 'No se encontraron publicaciones.',
        showDefaultImage: true,
      };
    }

    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Posts> {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AllowedRoles([Roles.Admin, Roles.Teacher])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.postService.remove(id);
    return {
      message: 'the post was deleted successfully',
    };
  }
}
