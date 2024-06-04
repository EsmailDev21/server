import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { MulterModule } from '@nestjs/platform-express';

import { GridFsMulterConfigService } from './gridfs-multer-config.service';
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
  ],
  controllers: [StorageController],
  providers: [GridFsMulterConfigService],
})
export class StorageModule {}
