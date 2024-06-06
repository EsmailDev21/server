import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { PrismaService } from 'src/prisma.service';
import { BarberAnalyticsController } from './barber-analytics.controller';

@Module({
  controllers: [AnalyticsController, BarberAnalyticsController],
  providers: [PrismaService],
})
export class AnalyticsModule {}
