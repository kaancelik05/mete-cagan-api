import { ApiProperty } from '@nestjs/swagger';

export class ImagesDto {
  @ApiProperty()
  originalname: string;
  @ApiProperty()
  destination: string;
  @ApiProperty()
  filename: string;
  @ApiProperty()
  path: string;
  @ApiProperty()
  uploadDate: Date;
  @ApiProperty()
  imageName: string;
  @ApiProperty()
  imageDesc: string;
}