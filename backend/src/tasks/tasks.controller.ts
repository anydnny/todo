import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAllTasks() {
    return this.tasksService.findAll();
  }
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  @Patch(':id/status')
  toggleStatus(@Param('id') id: string) {
    return this.tasksService.toggleStatus(id);
  }

  @Delete('/:id/delete')
  remove(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
