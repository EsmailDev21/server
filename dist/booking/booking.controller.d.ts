import { BookingService } from './booking.service';
import { BookingCreateDTO, BookingUpdateDTO, ReservationStatus } from '../types';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    getById(id: string): Promise<import(".prisma/client").Booking>;
    getMany(): Promise<import(".prisma/client").Booking[]>;
    create(data: BookingCreateDTO): Promise<import(".prisma/client").Booking>;
    update(id: string, data: BookingUpdateDTO): Promise<Object>;
    changeBookingStatus(id: string, data: {
        status: ReservationStatus;
    }): Promise<Object>;
    delete(id: string): Promise<import(".prisma/client").Booking>;
}
