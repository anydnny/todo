import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Project } from '../projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
