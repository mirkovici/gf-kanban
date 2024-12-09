import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ColumnService } from './column.service';
import { Column } from './entities/column.entity';
import { TaskService } from '@/task/task.service';
import { Task } from '@/task/entities/task.entity';

@Resolver(() => Column)
export class ColumnResolver {
  constructor(
    private readonly columnService: ColumnService,
    private readonly taskService: TaskService,
  ) {}

  /**
   * Query: Get all columns
   */
  @Query(() => [Column], { name: 'getAllColumns' })
  async getAllColumns(): Promise<Column[]> {
    return (await this.columnService.getAllColumns()) as unknown as Column[];
  }

  /**
   * Mutation: Create a column
   */
  @Mutation(() => Column)
  async createColumn(
    @Args('name', { type: () => String }) name: string,
    @Args('order', { type: () => Number }) order: number,
  ): Promise<Column> {
    return (await this.columnService.createColumn(
      name,
      order,
    )) as unknown as Column;
  }

  /**
   * ResolveField: Get tasks for a column
   */
  @ResolveField(() => [Task])
  async tasks(@Parent() column: Column): Promise<Task[]> {
    return (await this.taskService.getTasksByColumnId(
      column.id,
    )) as unknown as Task[];
  }

  /**
   * Mutation: Add a task to a column
   */
  @Mutation(() => Column)
  async addTaskToColumn(
    @Args('columnId', { type: () => ID }) columnId: string,
    @Args('taskId', { type: () => ID }) taskId: string,
  ): Promise<Column> {
    return (await this.columnService.addTaskToColumn(
      columnId,
      taskId,
    )) as unknown as Column;
  }

  /**
   * Mutation: Remove a task from a column
   */
  @Mutation(() => Column)
  async removeTaskFromColumn(
    @Args('columnId', { type: () => ID }) columnId: string,
    @Args('taskId', { type: () => ID }) taskId: string,
  ): Promise<Column> {
    return (await this.columnService.removeTaskFromColumn(
      columnId,
      taskId,
    )) as unknown as Column;
  }

  /**
   * Mutation: Delete a column
   */
  @Mutation(() => Column, { nullable: true })
  async deleteColumn(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Column | null> {
    return (await this.columnService.deleteColumn(
      id,
    )) as unknown as Column | null;
  }
}
