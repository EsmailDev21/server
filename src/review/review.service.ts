import { Injectable } from '@nestjs/common';
import { Review } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ReviewCreateDTO, ReviewUpdateDTO } from '../types';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: string): Promise<Review> {
    try {
      return await this.prismaService.review.findUnique({ where: { id } });
    } catch (error) {
      return error.message;
    }
  }

  async getMany(): Promise<Review[]> {
    try {
      const services = await this.prismaService.review.findMany();
      return services;
    } catch (error) {
      return error.message;
    }
  }

  async create(data: ReviewCreateDTO) {
    try {
      const service = await this.prismaService.review.create({
        data,
      });
      return service;
    } catch (error) {
      return error.message;
    }
  }

  async update(data: ReviewUpdateDTO, id: string) {
    try {
      const service = await this.prismaService.review.update({
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
      const service = await this.prismaService.review.delete({
        where: { id },
      });
      return service;
    } catch (error) {
      return error.message;
    }
  }
}
