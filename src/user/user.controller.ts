import { Controller, Post, Body, Get, Param, Put, Delete, UseInterceptors, UploadedFiles, Res, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UserUpdateDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/models/user.model';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {

  constructor(private userService: UserService){}

  @Post()
  async createUser(@Body() body: UserCreateDto) : Promise<UserModel> {
    body.password = await this.userService.converToHash(body.password);
    return await this.userService.create(body);
  }

  @Post(':uplaod')
  @UseInterceptors(FileInterceptor('image',{
    storage: diskStorage({
      destination: `${__dirname}../../../uploads`,
      filename: (req, file, cb) => {
        const randomName = 'textimg';
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    })
  })
  )
  async uploloadFile(@UploadedFile() file) {
    console.log(file)
    return await file
  }

  // @Get(':imgpath')
  // seeUploadedFile(@Param('imgpath') image, @Res() res) {
  //   return res.sendFile(image, {root: 'uploads'});
  // }

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUser(@Param() params): Promise<UserModel> {
    return await this.userService.findOne(params.id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserModel> {
    return await this.userService.update(id, userUpdateDto)
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<UserModel> {
    return await this.userService.delete(id);
  }
}
