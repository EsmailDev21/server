import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { PrismaService } from 'src/prisma.service';
import { NotificationService } from 'src/notification/notification.service';
//import { NotificationGateway } from 'src/notification/notification.gateway';

@Module({
  controllers: [BookingController],
  providers: [BookingService, PrismaService, NotificationService],
})
export class BookingModule {}
