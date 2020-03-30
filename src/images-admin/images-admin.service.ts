import { Injectable } from '@nestjs/common';
import { ImageModel } from 'tools/models/images.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImagesDto } from 'tools/dtos/images.dto';

@Injectable()
export class ImagesAdminService {
  constructor(
    @InjectModel('Images') private readonly imagesMongo: Model<ImageModel>,
  ) { }

  async create(image: ImagesDto): Promise<ImageModel> {

    const createImage = new this.imagesMongo({ ...image});

    return await createImage.save();
  }

  async findAll(): Promise<ImageModel[]> {
    return await this.imagesMongo.find().exec();
  }

  async findOne(id: string): Promise<ImageModel> {
    return await this.imagesMongo.find({ _id: id }).exec();
  }

  async delete(id: string): Promise<ImageModel> {
    return await this.imagesMongo.findByIdAndRemove({ _id: id }).exec();
  }

  async update(id: string, image: ImagesDto): Promise<ImageModel> {
    let newModel = this.imagesMongo.findOne({ _id: id }).exec();
    newModel = { ...newModel, ...image };

    return await this.imagesMongo
      .findByIdAndUpdate(id, newModel, { new: true })
      .exec();
  }
}