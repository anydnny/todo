import { DataSource } from 'typeorm';
import { dbConfig } from '../config/db.config';

export const AppDataSource = new DataSource(dbConfig());

// Функция для инициализации подключения
export const initializeDataSource = async (): Promise<DataSource> => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log('Database connection established successfully');

      // Проверяем соединение
      await AppDataSource.query('SELECT 1');
      console.log('Database health check passed');
    } catch (error) {
      console.error('Error during Data Source initialization:', error);
      throw error;
    }
  }
  return AppDataSource;
};

// Функция для закрытия соединения
export const closeDataSource = async (): Promise<void> => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log('📊 Database connection closed');
  }
};
