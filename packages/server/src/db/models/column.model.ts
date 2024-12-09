import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Column extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  order: number;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }], default: [] }) // Reference Task model
  tasks: Types.ObjectId[]; // Array of ObjectIds

  createdAt?: Date;
  updatedAt?: Date;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);

// Optional Interface for Columns
export interface IColumn {
  id?: string; // Optional id field for convenience
  _id: string; // Mongoose uses _id as the primary key
  name: string;
  order: number;
  tasks: string[]; // Use string array for easier handling in GraphQL
  createdAt?: Date;
  updatedAt?: Date;
}
