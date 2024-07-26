import { MailerService } from '@nestjs-modules/mailer';
export declare class MailingService {
    private mailerService;
    token: string;
    constructor(mailerService: MailerService);
    sendMail(email: string, content: string, subject: string): Promise<Object>;
    sendUserConfirmationForPasswordChange(email: string): Promise<Object>;
    sendUserConfirmationForAccountVerification(email: string): Promise<Object>;
    generateToken(): string;
    checkToken(request: string): Promise<boolean>;
}
