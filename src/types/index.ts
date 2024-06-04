import { Booking, Review, Role, Service, User } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';

export class ServiceCreateDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  duration: string;
  @ApiProperty()
  note: string;
  @ApiProperty({
    maximum: 50,
    minimum: 0,
  })
  reduction: number;
  @ApiProperty()
  barberId: string;
}
export type ServiceUpdateDTO = Partial<ServiceCreateDTO>;
export type ServiceResponseDTO = ServiceCreateDTO & {
  bookings: Booking[];
  reviews: Review[];
};

export class ReviewCreateDTO {
  @ApiProperty({
    maximum: 5,
    minimum: 0,
  })
  rating: number;
  @ApiProperty()
  comment: string;
  @ApiProperty({ type: Date })
  createdAt: Date;
  @ApiProperty()
  serviceId: string;
  @ApiProperty()
  reviewPosterId: string;
}
export type ReviewUpdateDTO = Partial<ReviewCreateDTO>;
export type ReviewResponseDTO = ReviewCreateDTO & {
  user: User;
};

export class BookingCreateDTO {
  @ApiProperty()
  status: ReservationStatus;
  @ApiProperty()
  note: string;
  @ApiProperty()
  serviceId: string;
  @ApiProperty()
  customerId: string;
  @ApiProperty({ type: Date })
  date: Date;
}
export type BookingUpdateDTO = Partial<BookingCreateDTO>;
export type BookingResponseDTO = BookingCreateDTO & {
  customer: User[];
  service: Service;
};

export class UserCreateDTO {
  @ApiProperty({
    required: true,
  })
  email: string;
  @ApiProperty()
  role: Role;
  @ApiProperty()
  password: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  specialNote: string;
  @ApiProperty()
  isBanned: boolean;
  @ApiProperty()
  gender: 'MALE' | 'FEMALE';
  @ApiProperty()
  photoUrl: string;
}
export type UserUpdateDTO = Partial<UserCreateDTO>;
export type UserResponseDTO = UserCreateDTO & {
  bookings: Booking[];
  reviews: Review[];
};

export type ReservationStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'REFUSED'
  | 'CANCELLED_BY_CUSTOMER'
  | 'CANCELLED_BY_BARBER'
  | 'DONE';
