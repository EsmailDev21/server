import { Injectable } from '@nestjs/common';
import { Gender, Service } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import {
  ServiceCreateDTO,
  ServiceResponseDTO,
  ServiceUpdateDTO,
} from '../types';

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

  async filterServicesBypriceRange(priceRange: { min: number; max: number }) {
    try {
      console.log(priceRange);
      const services = await this.prismaService.service.findMany({
        where: {
          price: {
            gte: priceRange.min, //>=
            lte: priceRange.max,//<=
          },
        },
      });
      return services;
    } catch (error) {
      return error.message;
    }
  }

  async filterServicesByRating(rating: number) {
    try {
      const services = await this.prismaService.service.findMany({
        where: {
          reviews: {
            every: {
              rating: {
                gte: rating,
                
              },
            },
          },
        },
      });
      return services;
    } catch (error) {
      return error.message;
    }
  }

  async filterServicesByGenders(genders: Gender[]) {

    try {
      const services = await this.prismaService.service.findMany({
        where: {
          genderType: {
            in: genders,
          },
        },
      });
      return services;
    } catch (error) {
      return error.message;
    }
  }
}
