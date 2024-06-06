import { ServiceService } from './service.service';
import { ServiceCreateDTO, ServiceUpdateDTO, ServiceResponseDTO } from '../types';
import { Service } from '@prisma/client';
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    getById(id: string): Promise<Service>;
    getMany(): Promise<Service[]>;
    create(data: ServiceCreateDTO): Promise<Service>;
    update(id: string, data: ServiceUpdateDTO): Promise<ServiceResponseDTO>;
    delete(id: string): Promise<ServiceResponseDTO>;
}
