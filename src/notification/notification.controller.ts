import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Prisma } from '@prisma/client';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() data: Prisma.NotificationCreateInput) {
    return this.notificationService.createNotification(data);
  }

  @Get()
  async findAll() {
    return this.notificationService.getNotifications();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.notificationService.getNotificationById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.NotificationUpdateInput,
  ) {
    return this.notificationService.updateNotification(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.notificationService.deleteNotification(id);
  }
}
