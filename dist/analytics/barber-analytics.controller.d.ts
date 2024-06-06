import { PrismaService } from 'src/prisma.service';
export declare class BarberAnalyticsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    numberOfCustomers(barberId: string): Promise<any>;
    numberOfBookings(barberId: string): Promise<any>;
    barberTotalSales(barberId: string): Promise<any>;
    barberWeeklySales(barberId: string): Promise<any>;
    barberMonthlySales(barberId: string): Promise<any>;
    barberCustomerInsights(barberId: string): Promise<any>;
    barberServiceRatings(barberId: string): Promise<any>;
    barberBookingTrends(barberId: string): Promise<any>;
    barberPerformance(barberId: string): Promise<any>;
    barberTopServices(barberId: string): Promise<any>;
    barberServiceGenderType(barberId: string): Promise<any>;
}
