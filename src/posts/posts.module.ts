import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostService } from './posts.service';
import { PostsController } from './posts.controller';
import { Posts, PostSchema } from './entities/post.entity';
import { JwtModule } from '@nestjs/jwt';
import { PostRepository } from './posts.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
    JwtModule,
  ],
  controllers: [PostsController],
  providers: [PostService, PostRepository],
})
export class PostsModule {}
