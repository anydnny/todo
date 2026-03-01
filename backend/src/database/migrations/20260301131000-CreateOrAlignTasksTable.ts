import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrAlignTasksTable20260301131000 implements MigrationInterface {
  name = 'CreateOrAlignTasksTable20260301131000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'new',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        project_id UUID NOT NULL,
        is_task_edit BOOLEAN NOT NULL DEFAULT false
      )
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'tasks'
            AND column_name = 'projectId'
        ) THEN
          EXECUTE 'ALTER TABLE tasks RENAME COLUMN "projectId" TO project_id';
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'tasks'
            AND column_name = 'project_id'
            AND data_type IN ('character varying', 'text')
        ) THEN
          EXECUTE 'ALTER TABLE tasks ALTER COLUMN project_id DROP NOT NULL';
          EXECUTE 'ALTER TABLE tasks ALTER COLUMN project_id TYPE UUID USING CASE WHEN project_id ~* ''^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'' THEN project_id::uuid ELSE NULL END';
        END IF;
      END $$;
    `);

    await queryRunner.query(
      `UPDATE tasks SET status = 'new' WHERE status = 'todo'`,
    );
    await queryRunner.query(
      `ALTER TABLE tasks ALTER COLUMN status SET DEFAULT 'new'`,
    );
    await queryRunner.query(
      `ALTER TABLE tasks ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE tasks ALTER COLUMN is_task_edit SET DEFAULT false`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id)`,
    );

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_constraint
          WHERE conname = 'fk_tasks_project_id'
        ) THEN
          ALTER TABLE tasks
          ADD CONSTRAINT fk_tasks_project_id
          FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;
        END IF;
      END $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE tasks DROP CONSTRAINT IF EXISTS fk_tasks_project_id`,
    );
    await queryRunner.query(`DROP INDEX IF EXISTS idx_tasks_project_id`);
    await queryRunner.query(`DROP TABLE IF EXISTS tasks`);
  }
}
