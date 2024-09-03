import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServiceModule } from './service/service.module';
import { BookingModule } from './booking/booking.module';
import { ReviewModule } from './review/review.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/role.guard';
import { PrismaService } from './prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { StorageModule } from './storage/storage.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AnalyticsModule } from './analytics/analytics.module';
import { NotificationModule } from './notification/notification.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailingModule } from './mailing/mailing.module';
import { ReportsModule } from './reports/reports.module';
@Module({
  imports: [
    UserModule,
    AuthModule,
    ServiceModule,
    BookingModule,
    ReviewModule,
    StorageModule,
    AnalyticsModule,
    NotificationModule,
    MailingModule,
    MongooseModule.forRoot(process.env.DATABASE_URL, {}),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..'),
    }),
    ReportsModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
