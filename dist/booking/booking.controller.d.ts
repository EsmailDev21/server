import { BookingService } from './booking.service';
import { BookingCreateDTO, BookingUpdateDTO, ReservationStatus } from 'src/types';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    getById(id: string): Promise<import(".prisma/client").Booking>;
    getMany(): Promise<import(".prisma/client").Booking[]>;
    create(data: BookingCreateDTO): Promise<import(".prisma/client").Booking>;
    update(id: string, data: BookingUpdateDTO): Promise<import(".prisma/client").Booking>;
    changeBookingStatus(id: string, data: {
        status: ReservationStatus;
    }): Promise<import(".prisma/client").Booking>;
    delete(id: string): Promise<import(".prisma/client").Booking>;
}
