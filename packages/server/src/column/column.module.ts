import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ColumnResolver } from './column.resolver';
import { ColumnService } from './column.service';
import { DBService } from '@/db/db.service';
import { ColumnSchema } from '@/db/models/column.model';
import { TaskService } from '@/task/task.service';
import { TaskSchema } from '@/db/models/task.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Column', schema: ColumnSchema },
      { name: 'Task', schema: TaskSchema },
    ]), // Register TaskSchema with Mongoose
  ],
  providers: [
    ColumnResolver, // Register the GraphQL resolver
    ColumnService, // Business logic for tasks
    TaskService,
    DBService, // Database service (if needed)
  ],
  exports: [ColumnService], // Export TaskService for use in other modules
})
export class ColumnModule {}
