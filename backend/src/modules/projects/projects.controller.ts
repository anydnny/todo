import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Create project' })
  @ApiResponse({ status: 201, description: 'Project created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @Post()
  createProject(@Body() dto: CreateProjectDto) {
    return this.projectsService.createProject(dto);
  }

  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Projects list returned' })
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @ApiOperation({ summary: 'Delete project by id' })
  @ApiParam({ name: 'id', description: 'Project UUID', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'Project deleted' })
  @ApiResponse({
    status: 400,
    description: 'Validation error or system project',
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteProject(@Param('id', new ParseUUIDPipe()) projectId: string) {
    await this.projectsService.deleteProject(projectId);
  }
}
