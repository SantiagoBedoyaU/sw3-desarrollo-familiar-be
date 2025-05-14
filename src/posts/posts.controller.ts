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
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/users/entities/user.entity';
import { AllowedRoles } from 'src/auth/decorators/roles.decorator';
import { PostQueryParams } from './dto/post-query-params.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: Request,
  ): Promise<PostEntity> {
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
  async findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AllowedRoles([Roles.Admin, Roles.Teacher])
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const post = await this.postService.findOne(id);

    if (post.approved === false) {
      throw new BadRequestException(
        'El post debe estar aprobado para editarlo',
      );
    }

    updatePostDto.approved = false;

    await this.postService.update(id, updatePostDto);
    return { message: 'Post updated successfully' };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AllowedRoles([Roles.Admin, Roles.Teacher])
  @Patch(':id/approve')
  async updateApproval(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const { approved } = updatePostDto;

    if (approved === false) {
      await this.postService.remove(id);
      return { message: 'Publicación rechazada y eliminada correctamente' };
    }

    await this.postService.approvePost(id);
    return { message: 'Publicación aprobada correctamente' };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AllowedRoles([Roles.Admin, Roles.Teacher])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.postService.remove(id);
    return {
      message: 'El post fue eliminado correctamente',
    };
  }
}
