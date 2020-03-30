import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from 'tools/models/images.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Images', schema: ImageSchema }])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule { }
