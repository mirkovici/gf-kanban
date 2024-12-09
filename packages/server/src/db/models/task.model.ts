import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IUser } from './user.model';
import { IColumn } from './column.model';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId; // Reference to the User

  @Prop({ type: Types.ObjectId, ref: 'Column', required: true })
  columnId: Types.ObjectId; // Reference to the Column

  createdAt?: Date;
  updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

// Optional Interface for Tasks
export interface ITask {
  id?: string; // Optional id field for convenience
  _id: string; // Mongoose uses _id as the primary key
  title: string;
  description?: string;
  dueDate?: Date;
  user: Types.ObjectId | IUser; // Accept either ObjectId or populated IUser
  column: Types.ObjectId | IColumn; // Accept either ObjectId or populated IColumn
  createdAt?: Date;
  updatedAt?: Date;
}
