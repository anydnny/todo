import { ConfigType } from '@nestjs/config';
import { dbConfig } from './db.config';
export type IDbConfigType = ConfigType<typeof dbConfig>;
