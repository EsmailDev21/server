import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { setMaxListeners } from 'process';

@Injectable()
export class MailingService {
  token: string;
  constructor(private mailerService: MailerService) {}

  async sendMail(
    email: string,
    content: string,
    subject: string,
  ): Promise<Object> {
    return await this.mailerService.sendMail({
      to: email,
      from: 'barbershop@trial-jy7zpl9x6r3l5vx6.mlsender.net', // override default from
      subject,
      text: content,
    });
  }
  async sendUserConfirmationForPasswordChange(email: string): Promise<Object> {
    console.log(this.token);
    return await this.mailerService.sendMail({
      to: email,
      from: 'barbershop@trial-jy7zpl9x6r3l5vx6.mlsender.net', // override default from
      subject: 'Reset Password',
      text:
        'Please enter this code to reset your password' + this.generateToken(),
    });
  }

  async sendUserConfirmationForAccountVerification(
    email: string,
  ): Promise<Object> {
    return await this.mailerService.sendMail({
      to: email,
      from: 'barbershop@trial-jy7zpl9x6r3l5vx6.mlsender.net', // override default from
      subject: 'Verify your account',
      text:
        'Please enter this code to verify your account' + this.generateToken(),
    });
  }

  generateToken(): string {
    this.token = Math.floor(100000 + Math.random() * 9000).toString();
    return this.token;
  }
  async checkToken(request: string): Promise<boolean> {
    return await (request === this.token);
  }
}
