import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll() {
    return this.taskRepository.find({});
  }
  async createTask(dto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      ...dto,
      status: 'new',
      isTaskEdit: false,
    });
    return this.taskRepository.save(task);
  }

  async toggleStatus(id: string): Promise<Task> {
    let newStatus = 'complete';
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    if (task.status === 'complete') {
      newStatus = 'new';
    }
    task.status = newStatus;
    return this.taskRepository.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Task not found');
  }
}
