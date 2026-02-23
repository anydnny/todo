import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createProject(dto: CreateProjectDto) {
    return this.projectRepository.save(dto);
  }
  async findAll() {
    return this.projectRepository.find({});
  }
  async deleteProject(projectId: string) {
    if (!projectId || projectId.trim() === '') {
      throw new BadRequestException('Project ID is required');
    }
    return this.projectRepository.delete({ id: projectId });
  }
}
