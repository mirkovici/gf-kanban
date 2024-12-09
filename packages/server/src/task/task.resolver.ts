import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task], { name: 'getAllTasks' })
  async getAllTasks(): Promise<Task[]> {
    return (await this.taskService.getAllTasks()) as unknown as Task[];
  }

  @Query(() => Task, { name: 'getTaskById' })
  async getTaskById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Task> {
    return (await this.taskService.getTaskById(id)) as unknown as Task;
  }

  @Query(() => [Task], { name: 'getTasksByUser' })
  async getTasksByUser(
    @Args('userId', { type: () => String }) userId: string,
  ): Promise<Task[]> {
    return (await this.taskService.getTasksByUser(userId)) as unknown as Task[];
  }

  @Mutation(() => Task)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<Task> {
    return (await this.taskService.createTask(
      createTaskInput,
    )) as unknown as Task;
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('id', { type: () => String }) id: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<Task> {
    return (await this.taskService.updateTask(
      id,
      updateTaskInput,
    )) as unknown as Task;
  }

  @Mutation(() => Task)
  async updateTaskColumn(
    @Args('taskId', { type: () => String }) taskId: string,
    @Args('columnId', { type: () => String }) columnId: string,
  ): Promise<Task> {
    return (await this.taskService.updateTaskColumn(
      taskId,
      columnId,
    )) as unknown as Task;
  }

  @Mutation(() => Task, { nullable: true })
  async deleteTask(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Task | null> {
    return (await this.taskService.deleteTask(id)) as unknown as Task | null;
  }
}
