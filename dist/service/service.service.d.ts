import { Service } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ServiceCreateDTO, ServiceUpdateDTO } from '../types';
export declare class ServiceService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getById(id: string): Promise<Service>;
    getMany(): Promise<Service[]>;
    create(data: ServiceCreateDTO): Promise<any>;
    update(data: ServiceUpdateDTO, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
