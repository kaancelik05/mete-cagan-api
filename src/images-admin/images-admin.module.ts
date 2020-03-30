import { Module } from '@nestjs/common';
import { ImagesAdminController } from './images-admin.controller';
import { ImagesAdminService } from './images-admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from 'tools/models/images.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Images', schema: ImageSchema }])],
  controllers: [ImagesAdminController],
  providers: [ImagesAdminService],
})
export class ImagesAdminModule { }
