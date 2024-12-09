import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IColumn } from '../db/models/column.model';

@Injectable()
export class ColumnService {
  constructor(
    @InjectModel('Column') private readonly columnModel: Model<IColumn>,
  ) {}

  async createColumn(name: string, order: number): Promise<IColumn> {
    const newColumn = new this.columnModel({ name, order });
    return newColumn.save();
  }

  async getAllColumns(): Promise<IColumn[]> {
    return this.columnModel.find().populate('tasks').exec();
  }

  async addTaskToColumn(columnId: string, taskId: string): Promise<IColumn> {
    return this.columnModel
      .findByIdAndUpdate(
        columnId,
        { $push: { tasks: new Types.ObjectId(taskId) } },
        { new: true },
      )
      .populate('tasks');
  }

  async removeTaskFromColumn(
    columnId: string,
    taskId: string,
  ): Promise<IColumn> {
    return this.columnModel
      .findByIdAndUpdate(
        columnId,
        { $pull: { tasks: new Types.ObjectId(taskId) } },
        { new: true },
      )
      .populate('tasks');
  }

  async deleteColumn(columnId: string): Promise<IColumn> {
    return this.columnModel.findByIdAndDelete(columnId).exec();
  }
}
