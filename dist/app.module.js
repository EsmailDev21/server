"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const service_module_1 = require("./service/service.module");
const booking_module_1 = require("./booking/booking.module");
const review_module_1 = require("./review/review.module");
const core_1 = require("@nestjs/core");
const role_guard_1 = require("./auth/guards/role.guard");
const prisma_service_1 = require("./prisma.service");
const storage_module_1 = require("./storage/storage.module");
const serve_static_1 = require("@nestjs/serve-static");
const path = require("path");
const analytics_module_1 = require("./analytics/analytics.module");
const notification_module_1 = require("./notification/notification.module");
const mongoose_1 = require("@nestjs/mongoose");
const mailing_module_1 = require("./mailing/mailing.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            service_module_1.ServiceModule,
            booking_module_1.BookingModule,
            review_module_1.ReviewModule,
            storage_module_1.StorageModule,
            analytics_module_1.AnalyticsModule,
            notification_module_1.NotificationModule,
            mailing_module_1.MailingModule,
            mongoose_1.MongooseModule.forRoot(process.env.DATABASE_URL, {}),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path.join(__dirname, '..'),
            }),
        ],
        controllers: [],
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map