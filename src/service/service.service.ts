import { Injectable } from '@nestjs/common';
import { Service } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import {
  ServiceCreateDTO,
  ServiceResponseDTO,
  ServiceUpdateDTO,
} from 'src/types';

@Injectable()
export class ServiceService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: string): Promise<Service> {
    try {
      return await this.prismaService.service.findUnique({ where: { id } });
    } catch (error) {
      return error.message;
    }
  }

  async getMany(): Promise<Service[]> {
    try {
      const services = await this.prismaService.service.findMany();
      return services;
    } catch (error) {
      return error.message;
    }
  }

  async create(data: ServiceCreateDTO) {
    try {
      const service = await this.prismaService.service.create({
        data,
      });
      return service;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async update(data: ServiceUpdateDTO, id: string) {
    try {
      const service = await this.prismaService.service.update({
        data: { ...data },
        where: { id },
      });
      return service;
    } catch (error) {
      return error.message;
    }
  }

  async delete(id: string) {
    try {
      const service = await this.prismaService.service.delete({
        where: { id },
      });
      return service;
    } catch (error) {
      return error.message;
    }
  }
}
