import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  formatISO,
} from 'date-fns';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('numOfUsers')
  async numberOfUsers() {
    try {
      const data = await this.prisma.user.count();
      return data;
    } catch (error) {
      return error.message;
    }
  }

  @Get('numOfBarbers')
  async numberOfBarbers() {
    try {
      const data = await this.prisma.user.count({
        where: {
          role: 'BARBER',
        },
      });
      return data;
    } catch (error) {
      return error.message;
    }
  }

  @Get('numOfCustomers')
  async numberOfCustomers() {
    try {
      const data = await this.prisma.user.count({
        where: {
          role: 'CUSTOMER',
        },
      });
      return data;
    } catch (error) {
      return error.message;
    }
  }

  @Get('totalSales')
  async totalSales() {
    try {
      const bookings = await this.prisma.booking.findMany({
        where: {
          status: 'DONE',
        },
      });

      const prices = await Promise.all(
        bookings.map(async (b) => {
          const service = await this.prisma.service.findUnique({
            where: {
              id: b.serviceId,
            },
          });
          return service.reduction > 0
            ? service.price + (service.price * service.reduction) / 100
            : service.price;
        }),
      );

      const totalSales = prices.reduce((prev, curr) => prev + curr, 0);

      return totalSales;
    } catch (error) {
      return error.message;
    }
  }

  @Get('monthlySales')
  async monthlySales() {
    try {
      const bookings = await this.prisma.booking.findMany({
        where: {
          status: 'DONE',
        },
        include: {
          service: true,
        },
      });

      const monthlySales = bookings.reduce((acc, booking) => {
        const date = new Date(booking.date);
        const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format: YYYY-M

        const price =
          booking.service.reduction > 0
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
    } catch (error) {
      return error.message;
    }
  }

  @Get('weeklySales')
  async weeklySales() {
    try {
      const bookings = await this.prisma.booking.findMany({
        where: {
          status: 'DONE',
        },
        include: {
          service: true,
        },
      });

      const weeklySales = bookings.reduce((acc, booking) => {
        const date = new Date(booking.date);
        const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 }); // Monday as the start of the week
        const weekYear = formatISO(startOfWeekDate, { representation: 'date' }); // Format: YYYY-MM-DD (start of the week)

        const price =
          booking.service.reduction > 0
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
    } catch (error) {
      return error.message;
    }
  }

  @Get('topServices')
  async topServices() {
    try {
      const services = await this.prisma.service.findMany({
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
          const price =
            service.reduction > 0
              ? service.price + (service.price * service.reduction) / 100
              : service.price;
          return acc + price;
        }, 0),
      }));

      return serviceRevenue.sort((a, b) => b.revenue - a.revenue);
    } catch (error) {
      return error.message;
    }
  }

  @Get('customerInsights')
  async customerInsights() {
    try {
      const customers = await this.prisma.user.findMany({
        where: {
          role: 'CUSTOMER',
        },
        include: {
          bookings: {
            where: {
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
          const price =
            booking.service.reduction > 0
              ? booking.service.price +
                (booking.service.price * booking.service.reduction) / 100
              : booking.service.price;
          return acc + price;
        }, 0),
        bookingCount: customer.bookings.length,
      }));

      return customerData.sort((a, b) => b.totalSpent - a.totalSpent);
    } catch (error) {
      return error.message;
    }
  }
  @Get('serviceRatings')
  async serviceRatings() {
    try {
      const services = await this.prisma.service.findMany({
        include: {
          reviews: true,
        },
      });

      const serviceRatings = services.map((service) => ({
        serviceName: service.name,
        averageRating:
          service.reviews.reduce((acc, review) => acc + review.rating, 0) /
            service.reviews.length || 0,
        totalRatings: service.reviews.length,
      }));

      return serviceRatings.sort((a, b) => b.averageRating - a.averageRating);
    } catch (error) {
      return error.message;
    }
  }

  @Get('bookingTrends')
  async bookingTrends() {
    try {
      const bookings = await this.prisma.booking.findMany({
        where: {
          status: {
            in: ['DONE'],
          },
        },
      });

      // Daily Bookings
      const dailyBookings = bookings.reduce((acc, booking) => {
        const date = formatISO(new Date(booking.date), {
          representation: 'date',
        });
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
        return acc;
      }, {});

      // Weekly Bookings
      const weeklyBookings = bookings.reduce((acc, booking) => {
        const date = new Date(booking.date);
        const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 }); // Monday as the start of the week
        const weekYear = formatISO(startOfWeekDate, { representation: 'date' });
        if (!acc[weekYear]) {
          acc[weekYear] = 0;
        }
        acc[weekYear]++;
        return acc;
      }, {});

      // Monthly Bookings
      const monthlyBookings = bookings.reduce((acc, booking) => {
        const date = new Date(booking.date);
        const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format: YYYY-M
        if (!acc[monthYear]) {
          acc[monthYear] = 0;
        }
        acc[monthYear]++;
        return acc;
      }, {});

      // Peak Booking Times (Hour of the day)
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
    } catch (error) {
      return error.message;
    }
  }

  @Get('barbersPerformance')
  async barbersPerformance() {
    try {
      const barbers = await this.prisma.user.findMany({
        where: {
          role: 'BARBER',
        },
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

      const barbersPerformance = barbers.map((barber) => {
        let totalRevenue = 0;
        let totalBookings = 0;
        let totalRating = 0;
        let totalReviews = 0;

        barber.services.forEach((service) => {
          // Calculate total revenue and bookings
          service.bookings.forEach((booking) => {
            const price =
              service.reduction > 0
                ? service.price + (service.price * service.reduction) / 100
                : service.price;
            totalRevenue += price;
            totalBookings++;
          });

          // Calculate total ratings
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
      });

      return barbersPerformance;
    } catch (error) {
      return error.message;
    }
  }

  @Get('serviceGenderType')
  async serviceGenderType() {
    try {
      const serviceGenderType = await this.prisma.service.groupBy({
        by: ['genderType'],
        _count: {
          id: true,
        },
      });

      return serviceGenderType.map((result) => ({
        genderType: result.genderType || 'UNKNOWN',
        count: result._count.id,
      }));
    } catch (error) {
      return error.message;
    }
  }
}
