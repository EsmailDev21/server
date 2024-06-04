import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Booking, ReservationStatus } from '@prisma/client';
import { NotificationService } from 'src/notification/notification.service';
import { PrismaService } from 'src/prisma.service';
import { BookingCreateDTO, BookingUpdateDTO } from 'src/types';

@Injectable()
export class BookingService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  async getById(id: string): Promise<Booking> {
    try {
      return await this.prismaService.booking.findUnique({ where: { id } });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMany(): Promise<Booking[]> {
    try {
      return await this.prismaService.booking.findMany();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: BookingCreateDTO): Promise<Booking> {
    try {
      const booking = await this.prismaService.booking.create({ data });
      const service = await this.prismaService.service.findUnique({
        where: { id: booking.serviceId },
        include: { barber: true },
      });
      if (!service || !service.barber) {
        throw new HttpException('Barber not found', HttpStatus.NOT_FOUND);
      }
      await this.notificationService.createNotification({
        recipient: { connect: { id: service.barber.id } },
        title: 'New Booking',
        content: 'You have got a new booking!',
        type: 'BOOKING_CREATED',
      });
      return booking;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(data: BookingUpdateDTO, id: string): Promise<Booking> {
    try {
      return await this.prismaService.booking.update({
        data,
        where: { id },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async changeBookingStatus(
    data: { status: ReservationStatus },
    id: string,
  ): Promise<Booking> {
    try {
      const booking = await this.prismaService.booking.update({
        data: data,
        where: { id },
      });

      const service = await this.prismaService.service.findUnique({
        where: { id: booking.serviceId },
        include: { barber: true },
      });

      const customer = await this.prismaService.user.findUnique({
        where: { id: booking.customerId },
      });

      if (!service || !service.barber || !customer) {
        throw new HttpException(
          'Service or related users not found',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.sendStatusChangeNotifications(
        data.status,
        service.barber,
        customer,
        booking,
      );

      return booking;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async sendStatusChangeNotifications(
    status: ReservationStatus,
    barber,
    customer,
    booking,
  ) {
    try {
      console.log('Received status:', status);
      console.log('Barber:', barber);
      console.log('Customer:', customer);
      console.log('Booking:', booking);
      const notifications = [];

      if (status === ReservationStatus.CANCELLED_BY_CUSTOMER) {
        notifications.push(
          this.notificationService.createNotification({
            recipient: { connect: { id: barber.id } },
            title: 'Booking Cancelled',
            content: `Your booking with ${customer.name} has been cancelled!`,
            type: 'BOOKING_CANCELLED',
          }),
        );
      } else if (status === ReservationStatus.CONFIRMED) {
        notifications.push(
          this.notificationService.createNotification({
            recipient: { connect: { id: booking.customerId } },
            title: 'Booking Confirmed',
            content: `Your booking with ${
              barber.name
            } has been confirmed for ${new Date(
              booking.date,
            ).toLocaleDateString()}.`,
            type: 'BOOKING_ACCEPTED',
          }),
        );
      } else if (status === ReservationStatus.CANCELLED_BY_BARBER) {
        notifications.push(
          this.notificationService.createNotification({
            recipient: { connect: { id: booking.customerId } },
            title: 'Booking Cancelled',
            content: `Your booking with ${barber.name} has been cancelled!`,
            type: 'BOOKING_CANCELLED',
          }),
        );
      } else if (status === ReservationStatus.REFUSED) {
        notifications.push(
          this.notificationService.createNotification({
            recipient: { connect: { id: booking.customerId } },
            title: 'Booking Refused',
            content: `Your booking with ${barber.name} has been refused.`,
            type: 'BOOKING_REFUSED',
          }),
        );
      } else if (status === ReservationStatus.DONE) {
        notifications.push(
          this.notificationService.createNotification({
            recipient: { connect: { id: booking.customerId } },
            title: 'Booking Completed',
            content: `Your booking with ${barber.name} is completed!`,
            type: 'BOOKING_DONE',
          }),
        );
        notifications.push(
          this.notificationService.createNotification({
            recipient: { connect: { id: barber.id } },
            title: 'Booking Completed',
            content: `Your booking with ${customer.name} is completed!`,
            type: 'BOOKING_DONE',
          }),
        );
      }

      const resolvedNotifications = await Promise.all(notifications);
      console.log('Notifications sent:', resolvedNotifications);
    } catch (error) {
      console.error('Error sending notifications:', error);
      throw new HttpException(
        'Error sending notifications',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string): Promise<Booking> {
    try {
      return await this.prismaService.booking.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
