import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProjectsTable20260301130000 implements MigrationInterface {
  name = 'CreateProjectsTable20260301130000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        project_list_type VARCHAR(50) NOT NULL DEFAULT 'custom'
      )
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'projects'
            AND column_name = 'projectListType'
        ) THEN
          EXECUTE 'ALTER TABLE projects RENAME COLUMN "projectListType" TO project_list_type';
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      ALTER TABLE projects
      ALTER COLUMN project_list_type SET DEFAULT 'custom'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS projects`);
  }
}
