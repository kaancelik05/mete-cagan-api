import * as mongoose from 'mongoose';

export class ImageModel {
  id: string;
  originalname: string;
  destination: string;
  filename: string;
  path: string;
  uploadDate: Date;
  imageName: string;
  imageDesc: string;
}

export const ImageSchema = new mongoose.Schema(
  {
    originalname: String,
    destination: String,
    filename: String,
    path: String,
    uploadDate: Date,
    imageName: String,
    imageDesc: String,
  },
);
