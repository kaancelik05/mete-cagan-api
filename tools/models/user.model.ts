import * as mongoose from 'mongoose';
import { AuditModel } from './audit.model';

export class UserModel {
  id: string;
  name: string;
  surname: string;
  image: string;
  email: string;
  password: string;
  birthDay: Date;
  audit: AuditModel;
}

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: [ true, 'user name is required']},
    surname: String,
    email: String,
    birthDay: Date,
    password: String,
    audit: Object,
  },
);
