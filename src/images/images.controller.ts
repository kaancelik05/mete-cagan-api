import { Controller, Get, Param } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImageModel } from 'tools/models/images.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
export class ImagesController {

  constructor(private imagesService: ImagesService) { }
  @Get()
  async getAllImages(): Promise<ImageModel[]> {
    return await this.imagesService.findAll();
  }

  @Get(':id')
  async getImage(@Param() params): Promise<ImageModel> {
    return await this.imagesService.findOne(params.id);
  }
}
