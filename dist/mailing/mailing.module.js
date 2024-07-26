"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailingModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const mailing_service_1 = require("./mailing.service");
const mailing_controller_1 = require("./mailing.controller");
let MailingModule = class MailingModule {
};
MailingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.mailersend.net',
                    port: 587,
                    auth: {
                        user: 'MS_4deyD8@trial-jy7zpl9x6r3l5vx6.mlsender.net',
                        pass: 'DzXTBxErleRRGwaI',
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                },
            }),
        ],
        providers: [mailing_service_1.MailingService],
        controllers: [mailing_controller_1.MailingController],
        exports: [],
    })
], MailingModule);
exports.MailingModule = MailingModule;
//# sourceMappingURL=mailing.module.js.map