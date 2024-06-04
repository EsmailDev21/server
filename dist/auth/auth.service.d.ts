import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDTO } from 'src/types';
export declare class LoginDTO {
    email: string;
    password: string;
}
export declare class AuthService {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signup(data: UserCreateDTO): Promise<any>;
    login(data: LoginDTO): Promise<{
        message: string;
        access_token: string;
    }>;
    validateUser(email: string, pass: string): Promise<any>;
    generateAccessToken(email: any, userId: string): Promise<string>;
}
