import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];

  transform(value: any): any {
    if (!this.isValidFileType(value.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only JPEG, PNG, and GIF files are allowed.',
      );
    }
    return value;
  }

  private isValidFileType(fileType: string): boolean {
    return this.allowedFileTypes.includes(fileType);
  }
}
