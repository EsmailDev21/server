import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
//import { NotificationGateway } from './notification.gateway';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, PrismaService],
})
export class ReportsModule {}
