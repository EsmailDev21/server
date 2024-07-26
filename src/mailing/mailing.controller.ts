import { Controller, Get, Query } from '@nestjs/common';
import { MailingService } from './mailing.service';
@Controller('mailing')
export class MailingController {
  constructor(private readonly mailService: MailingService) {}

  @Get('checkToken')
  async checkToken(@Query('token') token: string): Promise<boolean> {
    return await this.mailService.checkToken(token);
  }

  @Get('verifyAccount')
  async verifyAccount(@Query('email') email: string): Promise<Object> {
    return await this.mailService.sendUserConfirmationForAccountVerification(
      email,
    );
  }

  @Get('resetPassword')
  async resetPassword(@Query('email') email: string): Promise<Object> {
    return await this.mailService.sendUserConfirmationForPasswordChange(email);
  }
}
