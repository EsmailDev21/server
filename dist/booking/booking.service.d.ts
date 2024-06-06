import { Booking, ReservationStatus } from '@prisma/client';
import { NotificationService } from 'src/notification/notification.service';
import { PrismaService } from 'src/prisma.service';
import { BookingCreateDTO, BookingUpdateDTO } from '../types';
export declare class BookingService {
    private readonly prismaService;
    private readonly notificationService;
    constructor(prismaService: PrismaService, notificationService: NotificationService);
    getById(id: string): Promise<Booking>;
    getMany(): Promise<Booking[]>;
    create(data: BookingCreateDTO): Promise<Booking>;
    update(data: BookingUpdateDTO, id: string): Promise<Booking>;
    changeBookingStatus(data: {
        status: ReservationStatus;
    }, id: string): Promise<Booking>;
    private sendStatusChangeNotifications;
    delete(id: string): Promise<Booking>;
}
