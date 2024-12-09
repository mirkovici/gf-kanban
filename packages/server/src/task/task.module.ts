import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { DBService } from '@/db/db.service';
import { TaskSchema } from '@/db/models/task.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  providers: [
    TaskResolver, // Register the GraphQL resolver
    TaskService, // Business logic for tasks
    DBService, // Database service (if needed)
  ],
  exports: [TaskService], // Export TaskService for use in other modules
})
export class TaskModule {}
