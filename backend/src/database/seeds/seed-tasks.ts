import { AppDataSource } from '../data-source';
import { tasksSeedData } from './data/seed-tasks-data';
import { Task } from '../../modules/tasks/entities/task.entity';
import { Project } from '../../modules/projects/entities/project.entity';
import { Repository } from 'typeorm';

async function tasksSeed() {
  console.log('DB config:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  });
  await AppDataSource.initialize();
  const projectsRepo: Repository<Project> =
    AppDataSource.getRepository(Project);
  const projects = await projectsRepo.find({ select: ['id'] });
  if (projects.length === 0) {
    console.error('❌ Нет проектов, запустите сидинг проектов');
    await AppDataSource.destroy();
    return;
  }
  const projectsIds = projects.map((item) => item.id);
  function getRandomProjectId(projectsIds: string[]): string {
    return projectsIds[Math.floor(Math.random() * projectsIds.length)];
  }
  const tasksRepo: Repository<Task> = AppDataSource.getRepository(Task);

  const tasks = await tasksRepo.find({});
  if (tasks.length !== 0) {
    console.error('❌ Задачи уже есть');
    await AppDataSource.destroy();
    return;
  }
  for (const task of tasksSeedData) {
    await tasksRepo.save({
      ...task,
      projectId: getRandomProjectId(projectsIds),
    });
  }
  console.log('✅ Сид успешен!');
  await AppDataSource.destroy();
}

async function main() {
  try {
    await tasksSeed();
  } catch (error) {
    console.error('❌ Ошибка при сидинге:', error);
    process.exit(1);
  }
}
main();
