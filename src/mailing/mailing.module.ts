import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailingController } from './mailing.controller';
import 'dotenv/config';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailersend.net',
        port: 587,

        auth: {
          user: process.env.MAILING_USER,
          pass: process.env.MAILING_MDP,
        },
        tls: {
          // Do not fail on invalid certs
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  providers: [MailingService],
  controllers: [MailingController],
  exports: [], // 👈 export for DI
})
export class MailingModule {}
