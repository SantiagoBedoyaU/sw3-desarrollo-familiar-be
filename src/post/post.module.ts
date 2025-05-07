import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Posts, PostSchema } from './entities/post.entity';
import { JwtModule } from '@nestjs/jwt';
import { PostRepository } from './post.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
    JwtModule,
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostsModule {}
