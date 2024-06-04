import { PrismaService } from 'src/prisma.service';
export declare class AnalyticsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    numberOfUsers(): Promise<any>;
    numberOfBarbers(): Promise<any>;
    numberOfCustomers(): Promise<any>;
    totalSales(): Promise<any>;
    monthlySales(): Promise<any>;
    weeklySales(): Promise<any>;
    topServices(): Promise<any>;
    customerInsights(): Promise<any>;
    serviceRatings(): Promise<any>;
    bookingTrends(): Promise<any>;
    barbersPerformance(): Promise<any>;
    serviceGenderType(): Promise<any>;
}
