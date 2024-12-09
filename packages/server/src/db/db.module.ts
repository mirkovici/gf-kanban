import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';
import { TaskSchema } from './models/task.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/gf-kanban'), // Replace with your MongoDB connection string
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Task', schema: TaskSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DbModule {}
