import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AnalyticsController],
  providers: [PrismaService],
})
export class AnalyticsModule {}
