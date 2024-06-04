import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Res,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './gridfs-multer-config.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Response } from 'express';
import * as mongoose from 'mongoose';

@Controller('storage')
export class StorageController {
  constructor(
    private readonly gridFsMulterConfigService: GridFsMulterConfigService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor(
      'file',
      this.gridFsMulterConfigService.createMulterOptions(),
    ),
  )
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new HttpException('File upload failed', HttpStatus.BAD_REQUEST);
    }
    return {
      message: 'File uploaded successfully',
      fileId: file.id,
      fileName: file.filename,
    };
  }

  @Get('file/:id')
  async getFile(@Param('id') id: string, @Res() res: Response) {
    const gfs = new mongoose.mongo.GridFSBucket(this.connection.db, {
      bucketName: 'uploads',
    });

    const file = await this.connection.db
      .collection('uploads.files')
      .findOne({ _id: new mongoose.Types.ObjectId(id) });

    if (!file) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }

    const readStream = gfs.openDownloadStream(file._id);
    readStream.pipe(res);
  }
}
