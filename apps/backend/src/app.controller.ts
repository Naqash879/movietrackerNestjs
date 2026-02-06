import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import cloudinary from './config/cloudinary.config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('testUploads')
  async testUpload() {
    try {
      const res = await cloudinary.uploader.upload(
        'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png',
      );
      console.log(res.secure_url);
    } catch (err) {
      console.error(err);
    }
  }
}
