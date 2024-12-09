import { Column } from '@/column/entities/column.entity';
import { User } from '@/user/entities/user.entity';
import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType() // Marks this class as a GraphQL Object Type
export class Task {
  @Field(() => ID) // Specifies the field type as an ID
  id: string;

  @Field() // Field for the title
  title: string;

  @Field({ nullable: true }) // Field for the description, optional
  description?: string;

  @Field(() => User) // Use the `User` class directly instead of `IUser`
  user: User;

  @Field(() => Column) // Use the `Column` class directly instead of `IColumn`
  column: Column;

  @Field(() => GraphQLISODateTime) // Explicitly define Date fields
  dueDate: Date;

  @Field(() => GraphQLISODateTime) // Explicitly define Date fields
  createdAt: Date;

  @Field(() => GraphQLISODateTime) // Explicitly define Date fields
  updatedAt: Date;
}
