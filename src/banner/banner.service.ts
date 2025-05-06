import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner, BannerDocument } from './entities/banner.entity';
import { CreateBannerDto } from './dto/create-banner.dto';
import { NotFoundException } from '@nestjs/common';
import { Roles } from 'src/auth/users/entities/user.entity';
import { Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner.name) private bannerModel: Model<BannerDocument>,
  ) {}

  async createBanner(
    createBannerDto: CreateBannerDto,
    user: { sub: string; role: number },
  ): Promise<Banner> {
    const { imageUrl, eventDate, description, externalLink } = createBannerDto;

    if (eventDate && new Date(eventDate) < new Date()) {
      throw new BadRequestException(
        'La fecha del evento no puede ser menor a la fecha actual',
      );
    }

    const approved = user.role === Roles.Admin || user.role === Roles.Teacher;

    const banner = new this.bannerModel({
      ...createBannerDto,
      imageUrl,
      eventDate: eventDate ? new Date(eventDate) : undefined,
      description,
      externalLink,
      approved,
      createdBy: new Types.ObjectId(user.sub),
      createdAt: new Date(),
    });

    await banner.save();

    return banner;
  }

  async findAll(): Promise<Banner[]> {
    return this.bannerModel.find().exec();
  }

  async findOne(id: string): Promise<Banner> {
    const banner = await this.bannerModel.findById(id).exec();
    if (!banner) {
      throw new NotFoundException(`No se encontró el banner con ID ${id}`);
    }
    return banner;
  }

  async update(
    id: string,
    updateBannerDto: Partial<CreateBannerDto>,
  ): Promise<Banner> {
    const banner = await this.bannerModel.findByIdAndUpdate(
      id,
      updateBannerDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!banner) {
      throw new NotFoundException(`No se encontró el banner con ID ${id}`);
    }

    return banner;
  }

  async removeBanner(id: string) {
    const banner = await this.bannerModel.findById(id);

    if (!banner) {
      throw new NotFoundException('Banner no encontrado');
    }

    await banner.deleteOne();

    return { message: 'Banner eliminado exitosamente' };
  }
}
