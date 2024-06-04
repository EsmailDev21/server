/*import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;
  private connectedClients: Map<string, string> = new Map(); // To track connected clients

  constructor(private readonly prisma: PrismaService) {}

  @SubscribeMessage('createNotification')
  async handleCreateNotification(
    @MessageBody() data: Prisma.NotificationCreateInput,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const notification = await this.prisma.notification.create({
      data,
    });
    this.server.emit('newNotification', notification);
  }

  // Example method to send a notification to a specific user
  async sendNotificationToUser(
    userId: string,
    notification: any,
  ): Promise<void> {
    this.server.to(userId).emit('newNotification', notification);
  }

  handleConnection(client: Socket) {
    const userId = this.extractUserIdFromClient(client); // Implement this function to extract user ID from client
    if (userId) {
      this.connectedClients.set(client.id, userId);
      client.join(userId); // Join a room with the user ID
      console.log(`Client connected: ${client.id}, User ID: ${userId}`);
    } else {
      console.log(`Client connected: ${client.id}, User ID: not provided`);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = this.connectedClients.get(client.id);
    if (userId) {
      client.leave(userId); // Leave the room with the user ID
      this.connectedClients.delete(client.id);
      console.log(`Client disconnected: ${client.id}, User ID: ${userId}`);
    } else {
      console.log(`Client disconnected: ${client.id}`);
    }
  }

  private extractUserIdFromClient(client: Socket): string | null {
    // Implement this function to extract user ID from the client, e.g., from query parameters or authentication token
    const userId = client.handshake.query.userId as string; // Assuming userId is passed as a query parameter
    return userId || null;
  }
}
*/
