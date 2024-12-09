import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface IUser {
  id?: string; // Add this optional id field for convenience
  _id: string; // Mongoose uses _id as the primary key
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
