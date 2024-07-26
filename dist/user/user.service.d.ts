import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserCreateDTO } from '../types';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getById(id: string): Promise<any>;
    getAll(): Promise<any>;
    createUser(data: UserCreateDTO): Promise<User>;
    updateUser(id: string, data: Partial<User>): Promise<User>;
    updateUserPassword(id: string, data: string): Promise<User>;
    banUser(id: string): Promise<User>;
    unbanUser(id: string): Promise<User>;
    verifyUser(id: string): Promise<User>;
    getByLocation(filter: {
        city?: string;
        address?: string;
    }): Promise<User[]>;
    findOneByEmail(email: string): Promise<User>;
}
