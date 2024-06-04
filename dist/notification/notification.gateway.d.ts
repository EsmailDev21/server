import { Server, Socket } from 'socket.io';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class NotificationGateway {
    private readonly prisma;
    server: Server;
    private connectedClients;
    constructor(prisma: PrismaService);
    handleCreateNotification(data: Prisma.NotificationCreateInput, client: Socket): Promise<void>;
    sendNotificationToUser(userId: string, notification: any): Promise<void>;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    private extractUserIdFromClient;
}
