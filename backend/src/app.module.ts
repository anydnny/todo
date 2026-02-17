import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks/tasks.service';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './config/db.config';
import { IDbConfigType } from './config/config.types';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [dbConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [dbConfig.KEY],
      useFactory: (configService: IDbConfigType): TypeOrmModuleOptions => ({
        ...configService,
        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
