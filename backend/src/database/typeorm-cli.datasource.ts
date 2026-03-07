import { DataSource } from 'typeorm';
import { dbConfig } from '../config/db.config';

const TypeOrmCliDataSource = new DataSource(dbConfig());

export default TypeOrmCliDataSource;
