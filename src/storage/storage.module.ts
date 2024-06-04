import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
  ],
  controllers: [StorageController],
  providers: [],
})
export class StorageModule {}
