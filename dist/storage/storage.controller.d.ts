/// <reference types="multer" />
import { Request, Response } from 'express';
export declare const editFileName: (req: any, file: any, callback: any) => void;
export declare const imageFileFilter: (req: any, file: any, callback: any) => any;
export declare class StorageController {
    constructor();
    uploadFile(file: Express.Multer.File, res: Response, req: Request): Promise<Response<any, Record<string, any>>>;
}
