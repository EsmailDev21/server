import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDTO } from '../types';
import { MailingService } from 'src/mailing/mailing.service';
export declare class LoginDTO {
    email: string;
    password: string;
}
export declare class AuthService {
    private readonly userService;
    private jwtService;
    private readonly mailService;
    constructor(userService: UserService, jwtService: JwtService, mailService: MailingService);
    signup(data: UserCreateDTO): Promise<any>;
    login(data: LoginDTO): Promise<{
        message: string;
        access_token: string;
    }>;
    validateUser(email: string, pass: string): Promise<any>;
    generateAccessToken(email: any, userId: string): Promise<string>;
}
