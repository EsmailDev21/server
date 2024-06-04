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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const notification_service_1 = require("../notification/notification.service");
const prisma_service_1 = require("../prisma.service");
let BookingService = class BookingService {
    constructor(prismaService, notificationService) {
        this.prismaService = prismaService;
        this.notificationService = notificationService;
    }
    async getById(id) {
        try {
            return await this.prismaService.booking.findUnique({ where: { id } });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getMany() {
        try {
            return await this.prismaService.booking.findMany();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(data) {
        try {
            const booking = await this.prismaService.booking.create({ data });
            const service = await this.prismaService.service.findUnique({
                where: { id: booking.serviceId },
                include: { barber: true },
            });
            if (!service || !service.barber) {
                throw new common_1.HttpException('Barber not found', common_1.HttpStatus.NOT_FOUND);
            }
            await this.notificationService.createNotification({
                recipient: { connect: { id: service.barber.id } },
                title: 'New Booking',
                content: 'You have got a new booking!',
                type: 'BOOKING_CREATED',
            });
            return booking;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(data, id) {
        try {
            return await this.prismaService.booking.update({
                data,
                where: { id },
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async changeBookingStatus(data, id) {
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
                throw new common_1.HttpException('Service or related users not found', common_1.HttpStatus.NOT_FOUND);
            }
            await this.sendStatusChangeNotifications(data.status, service.barber, customer, booking);
            return booking;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sendStatusChangeNotifications(status, barber, customer, booking) {
        try {
            console.log('Received status:', status);
            console.log('Barber:', barber);
            console.log('Customer:', customer);
            console.log('Booking:', booking);
            const notifications = [];
            if (status === client_1.ReservationStatus.CANCELLED_BY_CUSTOMER) {
                notifications.push(this.notificationService.createNotification({
                    recipient: { connect: { id: barber.id } },
                    title: 'Booking Cancelled',
                    content: `Your booking with ${customer.name} has been cancelled!`,
                    type: 'BOOKING_CANCELLED',
                }));
            }
            else if (status === client_1.ReservationStatus.CONFIRMED) {
                notifications.push(this.notificationService.createNotification({
                    recipient: { connect: { id: booking.customerId } },
                    title: 'Booking Confirmed',
                    content: `Your booking with ${barber.name} has been confirmed for ${new Date(booking.date).toLocaleDateString()}.`,
                    type: 'BOOKING_ACCEPTED',
                }));
            }
            else if (status === client_1.ReservationStatus.CANCELLED_BY_BARBER) {
                notifications.push(this.notificationService.createNotification({
                    recipient: { connect: { id: booking.customerId } },
                    title: 'Booking Cancelled',
                    content: `Your booking with ${barber.name} has been cancelled!`,
                    type: 'BOOKING_CANCELLED',
                }));
            }
            else if (status === client_1.ReservationStatus.REFUSED) {
                notifications.push(this.notificationService.createNotification({
                    recipient: { connect: { id: booking.customerId } },
                    title: 'Booking Refused',
                    content: `Your booking with ${barber.name} has been refused.`,
                    type: 'BOOKING_REFUSED',
                }));
            }
            else if (status === client_1.ReservationStatus.DONE) {
                notifications.push(this.notificationService.createNotification({
                    recipient: { connect: { id: booking.customerId } },
                    title: 'Booking Completed',
                    content: `Your booking with ${barber.name} is completed!`,
                    type: 'BOOKING_DONE',
                }));
                notifications.push(this.notificationService.createNotification({
                    recipient: { connect: { id: barber.id } },
                    title: 'Booking Completed',
                    content: `Your booking with ${customer.name} is completed!`,
                    type: 'BOOKING_DONE',
                }));
            }
            const resolvedNotifications = await Promise.all(notifications);
            console.log('Notifications sent:', resolvedNotifications);
        }
        catch (error) {
            console.error('Error sending notifications:', error);
            throw new common_1.HttpException('Error sending notifications', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        try {
            return await this.prismaService.booking.delete({ where: { id } });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map