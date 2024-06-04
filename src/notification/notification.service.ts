import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Notification, Prisma } from '@prisma/client';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private notificationGateway: NotificationGateway,
  ) {}

  async createNotification(data: Prisma.NotificationCreateInput) {
    const notification = await this.prisma.notification.create({ data });
    this.notificationGateway.server.emit('newNotification', notification);
    return notification;
  }

  async getNotifications(): Promise<Notification[]> {
    return this.prisma.notification.findMany();
  }

  async getNotificationById(id: string) {
    return this.prisma.notification.findUnique({ where: { id } });
  }

  async updateNotification(id: string, data: Prisma.NotificationUpdateInput) {
    return this.prisma.notification.update({ where: { id }, data });
  }

  async deleteNotification(id: string) {
    return this.prisma.notification.delete({ where: { id } });
  }
}
