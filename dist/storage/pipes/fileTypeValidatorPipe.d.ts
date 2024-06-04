import { PipeTransform } from '@nestjs/common';
export declare class FileTypeValidationPipe implements PipeTransform {
    allowedFileTypes: string[];
    transform(value: any): any;
    private isValidFileType;
}
