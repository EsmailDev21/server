import { ReviewService } from './review.service';
import { ReviewCreateDTO, ReviewUpdateDTO } from '../types';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    getById(id: string): Promise<import(".prisma/client").Review>;
    getMany(): Promise<import(".prisma/client").Review[]>;
    create(data: ReviewCreateDTO): Promise<any>;
    update(id: string, data: ReviewUpdateDTO): Promise<any>;
    delete(id: string): Promise<any>;
}
