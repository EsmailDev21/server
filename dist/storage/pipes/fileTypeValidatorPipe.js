"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileTypeValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let FileTypeValidationPipe = class FileTypeValidationPipe {
    constructor() {
        this.allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    }
    transform(value) {
        if (!this.isValidFileType(value.mimetype)) {
            throw new common_1.BadRequestException('Invalid file type. Only JPEG, PNG, and GIF files are allowed.');
        }
        return value;
    }
    isValidFileType(fileType) {
        return this.allowedFileTypes.includes(fileType);
    }
};
FileTypeValidationPipe = __decorate([
    (0, common_1.Injectable)()
], FileTypeValidationPipe);
exports.FileTypeValidationPipe = FileTypeValidationPipe;
//# sourceMappingURL=fileTypeValidatorPipe.js.map