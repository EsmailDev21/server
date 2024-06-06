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
exports.BarberAnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const date_fns_1 = require("date-fns");
let BarberAnalyticsController = class BarberAnalyticsController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async numberOfCustomers(barberId) {
        try {
            const data = await this.prisma.user.count({
                where: {
                    role: 'CUSTOMER',
                    bookings: {
                        some: {
                            service: {
                                barberId,
                            },
                        },
                    },
                },
            });
            return data;
        }
        catch (error) {
            return error.message;
        }
    }
    async numberOfBookings(barberId) {
        try {
            const data = await this.prisma.booking.count({
                where: {
                    service: {
                        barberId,
                    },
                    status: 'DONE',
                },
            });
            return data;
        }
        catch (error) {
            return error.message;
        }
    }
    async barberTotalSales(barberId) {
        try {
            const bookings = await this.prisma.booking.findMany({
                where: {
                    service: {
                        barberId,
                    },
                    status: 'DONE',
                },
            });
            const prices = await Promise.all(bookings.map(async (b) => {
                const service = await this.prisma.service.findUnique({
                    where: {
                        id: b.serviceId,
                    },
                });
                return service.reduction > 0
                    ? service.price + (service.price * service.reduction) / 100
                    : service.price;
            }));
            const totalSales = prices.reduce((prev, curr) => prev + curr, 0);
            return totalSales;
        }
        catch (error) {
            return error.message;
        }
    }
    async barberWeeklySales(barberId) {
        try {
            const bookings = await this.prisma.booking.findMany({
                where: {
                    service: {
                        barberId,
                    },
                    status: 'DONE',
                },
                include: {
                    service: true,
                },
            });
            const weeklySales = bookings.reduce((acc, booking) => {
                const date = new Date(booking.date);
                const startOfWeekDate = (0, date_fns_1.startOfWeek)(date, { weekStartsOn: 1 });
                const weekYear = (0, date_fns_1.formatISO)(startOfWeekDate, { representation: 'date' });
                const price = booking.service.reduction > 0
                    ? booking.service.price +
                        (booking.service.price * booking.service.reduction) / 100
                    : booking.service.price;
                if (!acc[weekYear]) {
                    acc[weekYear] = 0;
                }
                acc[weekYear] += price;
                return acc;
            }, {});
            return weeklySales;
        }
        catch (error) {
            return error.message;
        }
    }
    async barberMonthlySales(barberId) {
        try {
            const bookings = await this.prisma.booking.findMany({
                where: {
                    service: {
                        barberId,
                    },
                    status: 'DONE',
                },
                include: {
                    service: true,
                },
            });
            const monthlySales = bookings.reduce((acc, booking) => {
                const date = new Date(booking.date);
                const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
                const price = booking.service.reduction > 0
                    ? booking.service.price +
                        (booking.service.price * booking.service.reduction) / 100
                    : booking.service.price;
                if (!acc[monthYear]) {
                    acc[monthYear] = 0;
                }
                acc[monthYear] += price;
                return acc;
            }, {});
            return monthlySales;
        }
        catch (error) {
            return error.message;
        }
    }
    async barberCustomerInsights(barberId) {
        try {
            const customers = await this.prisma.user.findMany({
                where: {
                    bookings: {
                        some: {
                            service: {
                                barberId,
                            },
                            status: 'DONE',
                        },
                    },
                    role: 'CUSTOMER',
                },
                include: {
                    bookings: {
                        where: {
                            service: {
                                barberId,
                            },
                            status: 'DONE',
                        },
                        include: {
                            service: true,
                        },
                    },
                },
            });
            const customerData = customers.map((customer) => ({
                customerId: customer.id,
                name: customer.name,
                totalSpent: customer.bookings.reduce((acc, booking) => {
                    const price = booking.service.reduction > 0
                        ? booking.service.price +
                            (booking.service.price * booking.service.reduction) / 100
                        : booking.service.price;
                    return acc + price;
                }, 0),
                bookingCount: customer.bookings.length,
            }));
            return customerData.sort((a, b) => b.totalSpent - a.totalSpent);
        }
        catch (error) {
            return error.message;
        }
    }
    async barberServiceRatings(barberId) {
        try {
            const services = await this.prisma.service.findMany({
                where: {
                    barberId,
                },
                include: {
                    reviews: true,
                },
            });
            const serviceRatings = services.map((service) => ({
                serviceName: service.name,
                averageRating: service.reviews.reduce((acc, review) => acc + review.rating, 0) /
                    service.reviews.length || 0,
                totalRatings: service.reviews.length,
            }));
            return serviceRatings.sort((a, b) => b.averageRating - a.averageRating);
        }
        catch (error) {
            return error.message;
        }
    }
    async barberBookingTrends(barberId) {
        try {
            const bookings = await this.prisma.booking.findMany({
                where: {
                    service: {
                        barberId,
                    },
                    status: {
                        in: ['DONE', 'CONFIRMED', 'PENDING'],
                    },
                },
            });
            const dailyBookings = bookings.reduce((acc, booking) => {
                const date = (0, date_fns_1.formatISO)(new Date(booking.date), {
                    representation: 'date',
                });
                if (!acc[date]) {
                    acc[date] = 0;
                }
                acc[date]++;
                return acc;
            }, {});
            const weeklyBookings = bookings.reduce((acc, booking) => {
                const date = new Date(booking.date);
                const startOfWeekDate = (0, date_fns_1.startOfWeek)(date, { weekStartsOn: 1 });
                const weekYear = (0, date_fns_1.formatISO)(startOfWeekDate, { representation: 'date' });
                if (!acc[weekYear]) {
                    acc[weekYear] = 0;
                }
                acc[weekYear]++;
                return acc;
            }, {});
            const monthlyBookings = bookings.reduce((acc, booking) => {
                const date = new Date(booking.date);
                const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
                if (!acc[monthYear]) {
                    acc[monthYear] = 0;
                }
                acc[monthYear]++;
                return acc;
            }, {});
            const hourlyBookings = bookings.reduce((acc, booking) => {
                const hour = new Date(booking.date).getHours();
                if (!acc[hour]) {
                    acc[hour] = 0;
                }
                acc[hour]++;
                return acc;
            }, {});
            return {
                dailyBookings,
                weeklyBookings,
                monthlyBookings,
                hourlyBookings,
            };
        }
        catch (error) {
            return error.message;
        }
    }
    async barberPerformance(barberId) {
        try {
            const barber = await this.prisma.user.findUnique({
                where: { id: barberId },
                include: {
                    services: {
                        include: {
                            bookings: {
                                where: {
                                    status: 'DONE',
                                },
                            },
                            reviews: true,
                        },
                    },
                },
            });
            let totalRevenue = 0;
            let totalBookings = 0;
            let totalRating = 0;
            let totalReviews = 0;
            barber.services.forEach((service) => {
                service.bookings.forEach((booking) => {
                    const price = service.reduction > 0
                        ? service.price + (service.price * service.reduction) / 100
                        : service.price;
                    totalRevenue += price;
                    totalBookings++;
                });
                service.reviews.forEach((review) => {
                    totalRating += review.rating;
                    totalReviews++;
                });
            });
            const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;
            return {
                barberId: barber.id,
                name: barber.name,
                totalRevenue,
                totalBookings,
                averageRating,
                totalReviews,
            };
        }
        catch (error) {
            return error.message;
        }
    }
    async barberTopServices(barberId) {
        try {
            const services = await this.prisma.service.findMany({
                where: {
                    barberId,
                },
                include: {
                    bookings: {
                        where: {
                            status: 'DONE',
                        },
                    },
                },
            });
            const serviceRevenue = services.map((service) => ({
                serviceName: service.name,
                revenue: service.bookings.reduce((acc, booking) => {
                    const price = service.reduction > 0
                        ? service.price + (service.price * service.reduction) / 100
                        : service.price;
                    return acc + price;
                }, 0),
                bookingCount: service.bookings.length,
            }));
            return serviceRevenue.sort((a, b) => b.revenue - a.revenue);
        }
        catch (error) {
            return error.message;
        }
    }
    async barberServiceGenderType(barberId) {
        try {
            const serviceGenderType = await this.prisma.service.groupBy({
                by: ['genderType'],
                where: {
                    barberId,
                },
                _count: {
                    id: true,
                },
            });
            return serviceGenderType.map((result) => ({
                genderType: result.genderType || 'UNKNOWN',
                count: result._count.id,
            }));
        }
        catch (error) {
            return error.message;
        }
    }
};
__decorate([
    (0, common_1.Get)('numOfCustomers'),
    __param(0, (0, common_1.Query)('barberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BarberAnalyticsController.prototype, "numberOfCustomers", null);
__decorate([
    (0, common_1.Get)('numOfBookings'),
    __param(0, (0, common_1.Query)('barberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BarberAnalyticsController.prototype, "numberOfBookings", null);
__decorate([
    (0, common_1.Get)('totalSales'),
    __param(0, (0, common_1.Query)('barberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BarberAnalyticsController.prototype, "barberTotalSales", null);
__decorate([
    (0, common_1.Get)('weeklySales'),
    __param(0, (0, common_1.Query)('barberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BarberAnalyticsController.prototype, "barberWeeklySales", null);
__decorate([
    (0, common_1.Get)('monthlySales'),
    __param(0, (0, common_1.Query)('barberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BarberAnalyticsController.prototype, "barberMonthlySales", null);
__decorate([
    (0, common_1.Get)('customerInsights'),
    __param(0, (0, common_1.Query)('barberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BarberAnalyticsController.prototype, "barberCustomerInsights", null);
__decorate([
    (0, common_1.Get)('serviceRatings'),
    __param(0, (0, common_1.Query)('barberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BarberAnalyticsController.prototype, "barberServiceRatings", null);
__decorate([
    (0, common_1.Get)('bookingTrends'),
    __param(0, (0, common_1.Query)('barberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BarberAnalyticsController.prototype, "barberBookingTrends", null);
__decorate([
    (0, common_1.Get)('performance'),
    __param(0, (0, common_1.Query)('barberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BarberAnalyticsController.prototype, "barberPerformance", null);
__decorate([
    (0, common_1.Get)('topServices'),
    __param(0, (0, common_1.Query)('barberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BarberAnalyticsController.prototype, "barberTopServices", null);
__decorate([
    (0, common_1.Get)('serviceGenderType'),
    __param(0, (0, common_1.Query)('barberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BarberAnalyticsController.prototype, "barberServiceGenderType", null);
BarberAnalyticsController = __decorate([
    (0, common_1.Controller)('barber-analytics'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BarberAnalyticsController);
exports.BarberAnalyticsController = BarberAnalyticsController;
//# sourceMappingURL=barber-analytics.controller.js.map