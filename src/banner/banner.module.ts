import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { Banner, BannerSchema } from './entities/banner.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),
    JwtModule,
  ],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannersModule {}
