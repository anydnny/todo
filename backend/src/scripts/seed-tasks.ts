import { AppDataSource } from '../config';
import { tasksSeedData } from './seed-tasks-data';
import { Task } from '../tasks/entities/tasks.entity';
import { Repository } from 'typeorm';

async function tasksSeed() {
  console.log('DB config:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  });
  await AppDataSource.initialize();
  const tasksRepo: Repository<Task> = AppDataSource.getRepository(Task);

  const tasks = await tasksRepo.find({});
  if (tasks.length !== 0) {
    console.error('❌ Задачи уже есть');
    await AppDataSource.destroy();
    return;
  }
  for (const task of tasksSeedData) {
    await tasksRepo.save({ ...task });
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
