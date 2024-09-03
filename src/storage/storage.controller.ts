import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as axios from 'axios';
import * as FormData from 'form-data';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = path.extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF|WEBP)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('storage')
export class StorageController {
  constructor() {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads', // Save the file temporarily in the uploads folder
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      console.log({ file });
      // Read the file from the uploads folder
      const filePath = path.join(__dirname, '../../uploads', file.filename);
      const fileStream = fs.createReadStream(filePath);

      // Create form data
      const form = new FormData();
      form.append('file', fileStream, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
      console.log({ form });

      // Make a POST request to the Express API
      const response = await axios.default.post(
        'https://utility-apis.onrender.com/api/upload',
        form,
        {
          headers: {
            ...form.getHeaders(),
          },
        },
      );
      console.log({ response });

      // Delete the file from the uploads folder after the upload
      fs.unlinkSync(filePath);

      // Send the response from the Express API back to the client
      console.log(response.data);
      return res.send(response.data);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
}
