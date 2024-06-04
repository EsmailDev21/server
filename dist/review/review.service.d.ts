import { Review } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ReviewCreateDTO, ReviewUpdateDTO } from 'src/types';
export declare class ReviewService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getById(id: string): Promise<Review>;
    getMany(): Promise<Review[]>;
    create(data: ReviewCreateDTO): Promise<any>;
    update(data: ReviewUpdateDTO, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
