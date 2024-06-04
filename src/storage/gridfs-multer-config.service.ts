import { Injectable } from '@nestjs/common';
import { GridFsStorage } from 'multer-gridfs-storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GridFsMulterConfigService {
  constructor(private readonly configService: ConfigService) {}

  createMulterOptions() {
    const storage = new GridFsStorage({
      url: process.env.DATABASE_URL,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      file: (req, file) => {
        return {
          bucketName: 'uploads',
          filename: `${Date.now()}-${file.originalname}`,
        };
      },
    });

    return {
      storage,
    };
  }
}
