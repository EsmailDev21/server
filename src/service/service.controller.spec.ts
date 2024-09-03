import { Test, TestingModule } from '@nestjs/testing';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { PrismaService } from '../prisma.service'; // Ensure this path is correct
import { ServiceUpdateDTO, ServiceResponseDTO } from '../types';
import { Service } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

import { Gender } from '@prisma/client';

export class ServiceCreateDTO {
  name: string;
  price: number;
  duration: string;
  note: string;
  reduction: number;
  barberId: string;
  imageUrl: string;
  genderType: Gender;
}
describe('ServiceController', () => {
  let controller: ServiceController;
  let service: ServiceService;

  const mockPrismaService = {
    service: {
      create: jest.fn(),
    },
  };

  const mockServiceService = {
    create: jest.fn<Promise<Service>, [ServiceCreateDTO]>((dto) => {
      return Promise.resolve({
        id: '1',
        ...dto,
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceController],
      providers: [
        { provide: ServiceService, useValue: mockServiceService },
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    controller = module.get<ServiceController>(ServiceController);
    service = module.get<ServiceService>(ServiceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a service (success)', async () => {
      const dto: ServiceCreateDTO = {
        name: 'Haircut',
        price: 20,
        duration: '30min',
        note: 'Include wash',
        reduction: 0,
        barberId: 'barber123',
        imageUrl: 'http://example.com/image.jpg',
        genderType: Gender.MALE,
      };

      const result = await controller.create(dto);
      expect(result).toEqual({
        id: '1',
        ...dto,
      });

      expect(mockServiceService.create).toHaveBeenCalledWith(dto);
    });

    it('should fail to create a service (failure)', async () => {
      const dto: ServiceCreateDTO = {
        name: 'Haircut',
        price: 20,
        duration: '30min',
        note: 'Include wash',
        reduction: 0,
        barberId: 'barber123',
        imageUrl: 'http://example.com/image.jpg',
        genderType: Gender.MALE,
      };

      mockServiceService.create.mockRejectedValueOnce(
        new Error('Failed to create service'),
      );

      await expect(controller.create(dto)).rejects.toThrow(
        'Failed to create service',
      );
    });
  });
});
