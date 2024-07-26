import { MailingService } from './mailing.service';
export declare class MailingController {
    private readonly mailService;
    constructor(mailService: MailingService);
    checkToken(token: string): Promise<boolean>;
    verifyAccount(email: string): Promise<Object>;
    resetPassword(email: string): Promise<Object>;
}
