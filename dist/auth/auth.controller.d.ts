import { AuthService, LoginDTO } from './auth.service';
import { UserCreateDTO } from 'src/types';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(data: UserCreateDTO): Promise<any>;
    login(data: LoginDTO): Promise<{
        message: string;
        access_token: string;
    }>;
    getProfile(req: any): any;
}
