import { Controller, Post, Body, Get, Param, Put, Delete, UseInterceptors, UploadedFiles, Res, UploadedFile } from '@nestjs/common';
import { ImagesAdminService } from './images-admin.service';
import { UserCreateDto, UserUpdateDto } from 'tools/dtos/user.dto';
import { ImageModel } from 'tools/models/images.model';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImagesDto } from 'tools/dtos/images.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('images-admin')
@Controller('images-admin')
export class ImagesAdminController {

  constructor(private imagesService: ImagesAdminService) { }

  @Post()
  async createImage(@Body() body: ImagesDto): Promise<ImageModel> {
    return await this.imagesService.create(body);
  }

  @Post(':upload')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: `${__dirname}../../../uploads`,
      filename: (req, file, cb) => {
        const randomName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 12);
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }),
  )
  async uploloadFile(@UploadedFile() file) {
    // tslint:disable-next-line: no-console
    console.log(file);
    return await file;
  }

  @Get()
  async getAllImages(): Promise<ImageModel[]> {
    return await this.imagesService.findAll();
  }

  @Get(':id')
  async getImage(@Param() params): Promise<ImageModel> {
    return await this.imagesService.findOne(params.id);
  }

  @Put(':id')
  async updateImage(
    @Param('id') id: string,
    @Body() imagesDto: ImagesDto,
  ): Promise<ImageModel> {
    return await this.imagesService.update(id, imagesDto);
  }

  @Delete(':id')
  async removeImage(@Param('id') id: string): Promise<ImageModel> {
    return await this.imagesService.delete(id);
  }
}
