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
exports.MailingService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
let MailingService = class MailingService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendMail(email, content, subject) {
        return await this.mailerService.sendMail({
            to: email,
            from: 'barbershop@trial-jy7zpl9x6r3l5vx6.mlsender.net',
            subject,
            text: content,
        });
    }
    async sendUserConfirmationForPasswordChange(email) {
        console.log(this.token);
        return await this.mailerService.sendMail({
            to: email,
            from: 'barbershop@trial-jy7zpl9x6r3l5vx6.mlsender.net',
            subject: 'Reset Password',
            text: 'Please enter this code to reset your password' + this.generateToken(),
        });
    }
    async sendUserConfirmationForAccountVerification(email) {
        return await this.mailerService.sendMail({
            to: email,
            from: 'barbershop@trial-jy7zpl9x6r3l5vx6.mlsender.net',
            subject: 'Verify your account',
            text: 'Please enter this code to verify your account' + this.generateToken(),
        });
    }
    generateToken() {
        this.token = Math.floor(100000 + Math.random() * 9000).toString();
        return this.token;
    }
    async checkToken(request) {
        return await (request === this.token);
    }
};
MailingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailingService);
exports.MailingService = MailingService;
//# sourceMappingURL=mailing.service.js.map