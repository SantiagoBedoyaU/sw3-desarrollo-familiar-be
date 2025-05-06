import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/users/entities/user.entity';
import { AllowedRoles } from 'src/auth/decorators/roles.decorator';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createBannerDto: CreateBannerDto,
    @Req() req: Request,
  ): Promise<Banner> {
    const user = req['user'];

    return this.bannerService.createBanner(createBannerDto, user);
  }

  @Get()
  async findAll(): Promise<Banner[]> {
    return this.bannerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Banner> {
    return this.bannerService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
  ): Promise<Banner> {
    return this.bannerService.update(id, updateBannerDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AllowedRoles([Roles.Admin, Roles.Teacher])
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.bannerService.removeBanner(id);
  }
}
