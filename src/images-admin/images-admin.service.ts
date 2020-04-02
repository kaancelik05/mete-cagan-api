import { Injectable } from '@nestjs/common';
import { ImageModel } from 'tools/models/images.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImagesDto } from 'tools/dtos/images.dto';
import * as cloudinary from 'cloudinary';
import environment from 'tools/environment/environment';

@Injectable()
export class ImagesAdminService {
  constructor(
    @InjectModel('Images') private readonly imagesMongo: Model<ImageModel>,
  ) {
    cloudinary.v2.config({
      cloud_name: environment.cloudinary.cloud_name,
      api_key: environment.cloudinary.api_key,
      api_secret: environment.cloudinary.api_secret,
    });
  }

  async upload(file: any): Promise<any> {
    let result;
    try {
      await cloudinary.v2.uploader.upload(file.path, function (error, response) {
        result = response;
        return response;
      });
      return await result;
    } catch (err) {
      return await err;
    }
  }

  async create(image: ImagesDto): Promise<ImageModel> {

    const createImage = new this.imagesMongo({ ...image });

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