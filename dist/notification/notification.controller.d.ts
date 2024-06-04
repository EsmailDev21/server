import { NotificationService } from './notification.service';
import { Prisma } from '@prisma/client';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(data: Prisma.NotificationCreateInput): Promise<import(".prisma/client").Notification>;
    findAll(): Promise<import(".prisma/client").Notification[]>;
    findOne(id: string): Promise<import(".prisma/client").Notification>;
    update(id: string, data: Prisma.NotificationUpdateInput): Promise<import(".prisma/client").Notification>;
    remove(id: string): Promise<import(".prisma/client").Notification>;
}
