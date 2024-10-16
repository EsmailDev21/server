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
          user: "MS_vCBMr8@trial-neqvygm229540p7w.mlsender.net",
          pass: "IRHHrsxCPNF3U3Im",
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
