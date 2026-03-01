import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Tasks list returned' })
  @Get()
  findAllTasks() {
    return this.tasksService.findAll();
  }

  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({ status: 201, description: 'Task created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  @ApiOperation({ summary: 'Toggle task status by id' })
  @ApiParam({ name: 'id', description: 'Task UUID', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Task status toggled' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @Patch(':id/status')
  toggleStatus(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tasksService.toggleStatus(id);
  }

  @ApiOperation({ summary: 'Delete task by id' })
  @ApiParam({ name: 'id', description: 'Task UUID', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'Task deleted' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.tasksService.deleteTask(id);
  }
}
