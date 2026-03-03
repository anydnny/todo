import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Project } from '../projects/entities/project.entity';
import { ChangeTaskProjectDto } from './dto/change-task-project.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
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

  async changeProject(
    taskId: string,
    dto: ChangeTaskProjectDto,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found');
    if (task.projectId === dto.projectId) return task;
    const project = await this.projectRepository.findOne({
      where: { id: dto.projectId },
    });
    if (!project) throw new NotFoundException('Project not found');
    task.projectId = dto.projectId;
    return this.taskRepository.save(task);
  }
}
