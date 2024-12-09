import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateTaskInput } from './create-task.input';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field({ nullable: true })
  title?: string;

  @Field()
  columnId: string; // Reference to the column

  @Field()
  userId: string; // Assignee of the task
}
