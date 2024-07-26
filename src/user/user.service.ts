import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserCreateDTO } from '../types';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: string) {
    try {
      return this.prismaService.user.findUnique({ where: { id } });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
  async getAll() {
    try {
      return this.prismaService.user.findMany();
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
  async createUser(data: UserCreateDTO): Promise<User> {
    try {
      return await this.prismaService.user.create({
        data,
      });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
  async updateUser(id: string, data: Partial<User>): Promise<User> {
    try {
      return await this.prismaService.user.update({
        data,
        where: { id },
      });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
  async updateUserPassword(id: string, data: string): Promise<User> {
    try {
      const hash = bcrypt.hashSync(data, 10);
      const update = await this.prismaService.user.update({
        data: {
          password: hash,
        },
        where: { id },
      });
      return update;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
  async banUser(id: string): Promise<User> {
    try {
      return await this.prismaService.user.update({
        data: {
          isBanned: true,
        },
        where: { id },
      });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async unbanUser(id: string): Promise<User> {
    try {
      return await this.prismaService.user.update({
        data: {
          isBanned: false,
        },
        where: { id },
      });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
  async verifyUser(id: string): Promise<User> {
    try {
      return await this.prismaService.user.update({
        data: {
          isVerified: true,
        },
        where: { id },
      });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
  async getByLocation(filter: {
    city?: string;
    address?: string;
  }): Promise<User[]> {
    try {
      return await this.prismaService.user.findMany({
        where: {
          OR: [{ city: filter.city }, { address: filter.address }],
        },
      });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}
