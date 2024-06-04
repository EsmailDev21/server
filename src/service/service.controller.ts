import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import {
  ServiceCreateDTO,
  ServiceUpdateDTO,
  ServiceResponseDTO,
} from 'src/types';
import { Role, Service } from '@prisma/client';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Service> {
    return this.serviceService.getById(id);
  }

  @Get()
  async getMany(): Promise<Service[]> {
    return this.serviceService.getMany();
  }

  //@UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  //@Roles(Role.BARBER)
  @Post()
  async create(@Body() data: ServiceCreateDTO): Promise<Service> {
    return this.serviceService.create(data);
  }

  //@UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  //@Roles(Role.BARBER)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: ServiceUpdateDTO,
  ): Promise<ServiceResponseDTO> {
    return this.serviceService.update(data, id);
  }

  //@UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  //@Roles(Role.ADMIN, Role.BARBER)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ServiceResponseDTO> {
    return this.serviceService.delete(id);
  }
}
