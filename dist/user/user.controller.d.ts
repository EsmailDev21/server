import { UserService } from './user.service';
import { User } from '@prisma/client';
import { UserCreateDTO } from '../types';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getById(id: string): Promise<User | string>;
    getAll(): Promise<User[] | string>;
    createUser(data: UserCreateDTO): Promise<User | string>;
    updateUser(id: string, data: Partial<User>): Promise<User | string>;
    banUser(id: string): Promise<User | string>;
    unbanUser(id: string): Promise<User | string>;
    getByLocation(city?: string, address?: string): Promise<User[] | string>;
}
