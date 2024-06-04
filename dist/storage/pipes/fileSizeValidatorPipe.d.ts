import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class FileSizeValidatorPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): boolean;
}
