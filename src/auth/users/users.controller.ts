import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AllowedRoles } from '../decorators/roles.decorator';
import { Roles } from './entities/user.entity';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/role.guard';
import { Query } from '@nestjs/common';
import { UserQueryParamsDto } from './dto/user-query-params.dto';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @AllowedRoles([Roles.Admin])
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @AllowedRoles([Roles.Admin])
  @UseGuards(AuthGuard, RolesGuard)
  findAll(@Query() query: UserQueryParamsDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @AllowedRoles([Roles.Admin])
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @AllowedRoles([Roles.Admin])
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @AllowedRoles([Roles.Admin])
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string, @Req() req: Request) {
    const authUser = req['user'];
    if (authUser.sub === id) {
      throw new BadRequestException('No se puede eliminar su mismo usuario');
    }
    return this.usersService.remove(id);
  }
}
