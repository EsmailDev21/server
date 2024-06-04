"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma.service");
let NotificationGateway = class NotificationGateway {
    constructor(prisma) {
        this.prisma = prisma;
        this.connectedClients = new Map();
    }
    async handleCreateNotification(data, client) {
        const notification = await this.prisma.notification.create({
            data,
        });
        this.server.emit('newNotification', notification);
    }
    async sendNotificationToUser(userId, notification) {
        this.server.to(userId).emit('newNotification', notification);
    }
    handleConnection(client) {
        const userId = this.extractUserIdFromClient(client);
        if (userId) {
            this.connectedClients.set(client.id, userId);
            client.join(userId);
            console.log(`Client connected: ${client.id}, User ID: ${userId}`);
        }
        else {
            console.log(`Client connected: ${client.id}, User ID: not provided`);
        }
    }
    handleDisconnect(client) {
        const userId = this.connectedClients.get(client.id);
        if (userId) {
            client.leave(userId);
            this.connectedClients.delete(client.id);
            console.log(`Client disconnected: ${client.id}, User ID: ${userId}`);
        }
        else {
            console.log(`Client disconnected: ${client.id}`);
        }
    }
    extractUserIdFromClient(client) {
        const userId = client.handshake.query.userId;
        return userId || null;
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createNotification'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], NotificationGateway.prototype, "handleCreateNotification", null);
NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationGateway);
exports.NotificationGateway = NotificationGateway;
//# sourceMappingURL=notification.gateway.js.map