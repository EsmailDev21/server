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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ServiceService = class ServiceService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getById(id) {
        try {
            return await this.prismaService.service.findUnique({ where: { id } });
        }
        catch (error) {
            return error.message;
        }
    }
    async getMany() {
        try {
            const services = await this.prismaService.service.findMany();
            return services;
        }
        catch (error) {
            return error.message;
        }
    }
    async create(data) {
        try {
            const service = await this.prismaService.service.create({
                data,
            });
            return service;
        }
        catch (error) {
            console.log(error);
            return error.message;
        }
    }
    async update(data, id) {
        try {
            const service = await this.prismaService.service.update({
                data: Object.assign({}, data),
                where: { id },
            });
            return service;
        }
        catch (error) {
            return error.message;
        }
    }
    async delete(id) {
        try {
            const service = await this.prismaService.service.delete({
                where: { id },
            });
            return service;
        }
        catch (error) {
            return error.message;
        }
    }
    async filterServicesBypriceRange(priceRange) {
        try {
            console.log(priceRange);
            const services = await this.prismaService.service.findMany({
                where: {
                    price: {
                        gte: priceRange.min,
                        lte: priceRange.max,
                    },
                },
            });
            return services;
        }
        catch (error) {
            return error.message;
        }
    }
    async filterServicesByRating(rating) {
        try {
            const services = await this.prismaService.service.findMany({
                where: {
                    reviews: {
                        every: {
                            rating: {
                                gte: rating,
                            },
                        },
                    },
                },
            });
            return services;
        }
        catch (error) {
            return error.message;
        }
    }
    async filterServicesByGenders(genders) {
        try {
            const services = await this.prismaService.service.findMany({
                where: {
                    genderType: {
                        in: genders,
                    },
                },
            });
            return services;
        }
        catch (error) {
            return error.message;
        }
    }
};
ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServiceService);
exports.ServiceService = ServiceService;
//# sourceMappingURL=service.service.js.map