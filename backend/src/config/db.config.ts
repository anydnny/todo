import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

function toBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) {
    return fallback;
  }
  return value === 'true';
}

export const dbConfig = registerAs(
  'DATABASE_CONFIG',
  (): DataSourceOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || process.env.DB_DATABASE || 'taskApp',
    synchronize: toBoolean(process.env.DB_SYNCHRONIZE, false),
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    migrations: [__dirname + '/../database/migrations/*.{ts,js}'],
    migrationsTableName: 'migrations_history',
    logging: process.env.NODE_ENV !== 'test',
  }),
);
