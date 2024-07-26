"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getById(id) {
        try {
            return this.prismaService.user.findUnique({ where: { id } });
        }
        catch (error) {
            console.log(error);
            return error.message;
        }
    }
    async getAll() {
        try {
            return this.prismaService.user.findMany();
        }
        catch (error) {
            console.log(error);
            return error.message;
        }
    }
    async createUser(data) {
        try {
            return await this.prismaService.user.create({
                data,
            });
        }
        catch (error) {
            console.log(error);
            return error.message;
        }
    }
    async updateUser(id, data) {
        try {
            return await this.prismaService.user.update({
                data,
                where: { id },
            });
        }
        catch (error) {
            console.log(error);
            return error.message;
        }
    }
    async updateUserPassword(id, data) {
        try {
            const hash = bcrypt.hashSync(data, 10);
            const update = await this.prismaService.user.update({
                data: {
                    password: hash,
                },
                where: { id },
            });
            return update;
        }
        catch (error) {
            console.log(error);
            return error.message;
        }
    }
    async banUser(id) {
        try {
            return await this.prismaService.user.update({
                data: {
                    isBanned: true,
                },
                where: { id },
            });
        }
        catch (error) {
            console.log(error);
            return error.message;
        }
    }
    async unbanUser(id) {
        try {
            return await this.prismaService.user.update({
                data: {
                    isBanned: false,
                },
                where: { id },
            });
        }
        catch (error) {
            console.log(error);
            return error.message;
        }
    }
    async verifyUser(id) {
        try {
            return await this.prismaService.user.update({
                data: {
                    isVerified: true,
                },
                where: { id },
            });
        }
        catch (error) {
            console.log(error);
            return error.message;
        }
    }
    async getByLocation(filter) {
        try {
            return await this.prismaService.user.findMany({
                where: {
                    OR: [{ city: filter.city }, { address: filter.address }],
                },
            });
        }
        catch (error) {
            console.log(error);
            return error.message;
        }
    }
    async findOneByEmail(email) {
        try {
            return await this.prismaService.user.findUnique({
                where: {
                    email,
                },
            });
        }
        catch (error) {
            console.log(error);
            return error.message;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map