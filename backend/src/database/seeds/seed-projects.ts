import { AppDataSource } from '../data-source';
import { projectsSeedData } from './data/seed-projects-data';
import { Project } from '../../modules/projects/entities/project.entity';

import { Repository } from 'typeorm';

async function projectsSeed() {
  console.log('DB config:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  });
  await AppDataSource.initialize();
  const projectsRepo: Repository<Project> =
    AppDataSource.getRepository(Project);

  const projects = await projectsRepo.find({});
  if (projects.length !== 0) {
    console.error('❌ Проекты уже есть');
    await AppDataSource.destroy();
    return;
  }
  for (const project of projectsSeedData) {
    await projectsRepo.save({ ...project });
  }
  console.log('✅ Сид успешен!');
  await AppDataSource.destroy();
}

async function main() {
  try {
    await projectsSeed();
  } catch (error) {
    console.error('❌ Ошибка при сидинге:', error);
    process.exit(1);
  }
}
void main();
