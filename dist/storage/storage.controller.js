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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageController = exports.imageFileFilter = exports.editFileName = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const axios = require("axios");
const FormData = require("form-data");
const multer_1 = require("multer");
const path = require("path");
const fs = require("fs");
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = path.extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.editFileName = editFileName;
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF|WEBP)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
let StorageController = class StorageController {
    constructor() { }
    async uploadFile(file, res, req) {
        try {
            console.log({ file });
            const filePath = path.join(__dirname, '../../uploads', file.filename);
            const fileStream = fs.createReadStream(filePath);
            const form = new FormData();
            form.append('file', fileStream, {
                filename: file.originalname,
                contentType: file.mimetype,
            });
            console.log({ form });
            const response = await axios.default.post('https://utility-apis.onrender.com/api/upload', form, {
                headers: Object.assign({}, form.getHeaders()),
            });
            console.log({ response });
            fs.unlinkSync(filePath);
            console.log(response.data);
            return res.send(response.data);
        }
        catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
};
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: 'uploads',
            filename: exports.editFileName,
        }),
        fileFilter: exports.imageFileFilter,
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "uploadFile", null);
StorageController = __decorate([
    (0, common_1.Controller)('storage'),
    __metadata("design:paramtypes", [])
], StorageController);
exports.StorageController = StorageController;
//# sourceMappingURL=storage.controller.js.map