import { Task } from '@/task/entities/task.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Column {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  order: number;

  @Field(() => [Task], { nullable: true })
  tasks: Task[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
