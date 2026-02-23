import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  createProject(@Body() dto: CreateProjectDto) {
    return this.projectsService.createProject(dto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Delete()
  deleteProject(@Body() projectId: { id: string }) {
    return this.projectsService.deleteProject(projectId.id);
  }
}
