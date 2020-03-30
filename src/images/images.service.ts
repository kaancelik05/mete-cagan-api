import { Injectable } from '@nestjs/common';
import { ImageModel } from 'tools/models/images.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel('Images') private readonly imagesMongo: Model<ImageModel>,
  ) { }

  async findAll(): Promise<ImageModel[]> {
    return await this.imagesMongo.find().exec();
  }

  async findOne(id: string): Promise<ImageModel> {
    return await this.imagesMongo.find({ _id: id }).exec();
  }
}