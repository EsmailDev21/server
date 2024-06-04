import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, Role, User } from '@prisma/client';
import { Roles } from 'src/auth/decorators/role.decorator';
import { UserCreateDTO } from 'src/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  ////@Roles(Role.ADMIN, Role.BARBER)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<User | string> {
    return this.userService.getById(id);
  }

  ////@UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  ////@Roles(Role.ADMIN, Role.BARBER)
  @Get()
  async getAll(): Promise<User[] | string> {
    return this.userService.getAll();
  }

  //@UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  //@Roles(Role.ADMIN)
  @Post()
  async createUser(@Body() data: UserCreateDTO): Promise<User | string> {
    return this.userService.createUser(data);
  }

  //@UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  //@Roles(Role.ADMIN, Role.BARBER, Role.CUSTOMER)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: Partial<User>,
  ): Promise<User | string> {
    return this.userService.updateUser(id, data);
  }

  //@UseGuards(RolesGuard)
  //@UseGuards(JwtAuthGuard)
  //@Roles(Role.ADMIN)
  @Put(':id/ban')
  async banUser(@Param('id') id: string): Promise<User | string> {
    return this.userService.banUser(id);
  }

  @Put(':id/unban')
  async unbanUser(@Param('id') id: string): Promise<User | string> {
    return this.userService.unbanUser(id);
  }
  @Get('location')
  async getByLocation(
    @Query('city') city?: string,
    @Query('address') address?: string,
  ): Promise<User[] | string> {
    const filter = { city, address };
    return this.userService.getByLocation(filter);
  }
}
