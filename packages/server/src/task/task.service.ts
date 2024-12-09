import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { ITask } from '@/db/models/task.model';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<ITask>) {}

  async getAllTasks(): Promise<ITask[]> {
    return this.taskModel.find().exec();
  }

  /**
   * Fetch all tasks associated with a specific column ID.
   * @param columnId - The ID of the column to fetch tasks for.
   * @returns A promise that resolves to a list of tasks.
   */
  async getTasksByColumnId(columnId: string): Promise<ITask[]> {
    try {
      return this.taskModel.find({ columnId }).exec(); // Fetch tasks by column ID
    } catch (error) {
      console.error(`Failed to fetch tasks for column ID ${columnId}:`, error);
      throw new Error('Could not fetch tasks for the specified column.');
    }
  }

  async getTaskById(id: string): Promise<ITask> {
    const task = await this.taskModel.findById(new Types.ObjectId(id)).exec();
    if (!task) {
      throw new Error(`Task with ID ${id} not found.`);
    }
    return task;
  }

  async getTasksByUser(userId: string): Promise<ITask[]> {
    return this.taskModel.find({ user: new Types.ObjectId(userId) }).exec();
  }

  async createTask(data: CreateTaskInput): Promise<ITask> {
    const newTask = new this.taskModel({
      ...data,
      user: new Types.ObjectId(data.userId),
      column: new Types.ObjectId(data.columnId),
    });
    return newTask.save();
  }

  async updateTask(id: string, data: UpdateTaskInput): Promise<ITask> {
    const updates: Partial<ITask> = { ...data };

    if (data.userId) {
      updates.user = new Types.ObjectId(data.userId);
    }

    if (data.columnId) {
      updates.column = new Types.ObjectId(data.columnId);
    }

    const updatedTask = await this.taskModel
      .findByIdAndUpdate(new Types.ObjectId(id), updates, { new: true })
      .exec();

    if (!updatedTask) {
      throw new Error(`Task with ID ${id} not found.`);
    }

    return updatedTask;
  }

  async updateTaskColumn(taskId: string, columnId: string): Promise<ITask> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(
        new Types.ObjectId(taskId),
        { column: new Types.ObjectId(columnId) },
        { new: true },
      )
      .exec();

    if (!updatedTask) {
      throw new Error(`Task with ID ${taskId} not found.`);
    }

    return updatedTask;
  }

  async deleteTask(id: string): Promise<ITask | null> {
    const deletedTask = await this.taskModel
      .findByIdAndDelete(new Types.ObjectId(id))
      .exec();
    if (!deletedTask) {
      throw new Error(`Task with ID ${id} not found.`);
    }
    return deletedTask;
  }
}
