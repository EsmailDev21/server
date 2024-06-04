import { Booking, Review, Role, Service, User } from '@prisma/client';
export declare class ServiceCreateDTO {
    name: string;
    price: number;
    duration: string;
    note: string;
    reduction: number;
    barberId: string;
}
export type ServiceUpdateDTO = Partial<ServiceCreateDTO>;
export type ServiceResponseDTO = ServiceCreateDTO & {
    bookings: Booking[];
    reviews: Review[];
};
export declare class ReviewCreateDTO {
    rating: number;
    comment: string;
    createdAt: Date;
    serviceId: string;
    reviewPosterId: string;
}
export type ReviewUpdateDTO = Partial<ReviewCreateDTO>;
export type ReviewResponseDTO = ReviewCreateDTO & {
    user: User;
};
export declare class BookingCreateDTO {
    status: ReservationStatus;
    note: string;
    serviceId: string;
    customerId: string;
    date: Date;
}
export type BookingUpdateDTO = Partial<BookingCreateDTO>;
export type BookingResponseDTO = BookingCreateDTO & {
    customer: User[];
    service: Service;
};
export declare class UserCreateDTO {
    email: string;
    role: Role;
    password: string;
    name: string;
    city: string;
    address: string;
    phoneNumber: string;
    specialNote: string;
    isBanned: boolean;
    gender: 'MALE' | 'FEMALE';
    photoUrl: string;
}
export type UserUpdateDTO = Partial<UserCreateDTO>;
export type UserResponseDTO = UserCreateDTO & {
    bookings: Booking[];
    reviews: Review[];
};
export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'REFUSED' | 'CANCELLED_BY_CUSTOMER' | 'CANCELLED_BY_BARBER' | 'DONE';
