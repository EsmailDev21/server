import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import {
  BookingCreateDTO,
  BookingUpdateDTO,
  ReservationStatus,
} from 'src/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  //@UseGuards(RolesGuard)
  //@Roles(Role.ADMIN, Role.BARBER)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.bookingService.getById(id);
  }

  //@UseGuards(RolesGuard)
  //@Roles(Role.ADMIN, Role.BARBER)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getMany() {
    return this.bookingService.getMany();
  }

  //@UseGuards(RolesGuard)
  //@Roles(Role.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: BookingCreateDTO) {
    return this.bookingService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: BookingUpdateDTO) {
    return this.bookingService.update(data, id);
  }

  //@UseGuards(JwtAuthGuard)
  @Put('change-status/:id')
  async changeBookingStatus(
    @Param('id') id: string,
    @Body() data: {status:ReservationStatus},
  ) {
    return this.bookingService.changeBookingStatus(data, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.bookingService.delete(id);
  }
}
