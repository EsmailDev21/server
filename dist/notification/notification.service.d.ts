import { PrismaService } from 'src/prisma.service';
import { Notification, Prisma } from '@prisma/client';
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    createNotification(data: Prisma.NotificationCreateInput): Promise<Notification>;
    getNotifications(): Promise<Notification[]>;
    getNotificationById(id: string): Promise<Notification>;
    updateNotification(id: string, data: Prisma.NotificationUpdateInput): Promise<Notification>;
    deleteNotification(id: string): Promise<Notification>;
}
