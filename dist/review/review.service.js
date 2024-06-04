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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ReviewService = class ReviewService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getById(id) {
        try {
            return await this.prismaService.review.findUnique({ where: { id } });
        }
        catch (error) {
            return error.message;
        }
    }
    async getMany() {
        try {
            const services = await this.prismaService.review.findMany();
            return services;
        }
        catch (error) {
            return error.message;
        }
    }
    async create(data) {
        try {
            const service = await this.prismaService.review.create({
                data,
            });
            return service;
        }
        catch (error) {
            return error.message;
        }
    }
    async update(data, id) {
        try {
            const service = await this.prismaService.review.update({
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
            const service = await this.prismaService.review.delete({
                where: { id },
            });
            return service;
        }
        catch (error) {
            return error.message;
        }
    }
};
ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map