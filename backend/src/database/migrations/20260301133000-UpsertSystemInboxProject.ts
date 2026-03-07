import { MigrationInterface, QueryRunner } from 'typeorm';
import { SYSTEM_PROJECTS_REGISTRY } from '../../modules/projects/constants/system-projects.registry';

export class UpsertSystemInboxProject20260301133000 implements MigrationInterface {
  name = 'UpsertSystemInboxProject20260301133000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const project of SYSTEM_PROJECTS_REGISTRY) {
      await queryRunner.query(
        `
          INSERT INTO projects (id, name, project_list_type)
          VALUES ($1, $2, 'system')
          ON CONFLICT (id)
          DO UPDATE SET
            name = EXCLUDED.name,
            project_list_type = EXCLUDED.project_list_type
        `,
        [project.id, project.name],
      );

      await queryRunner.query(
        `
          UPDATE projects
          SET project_list_type = 'system'
          WHERE LOWER(name) = LOWER($1)
        `,
        [project.name],
      );

      await queryRunner.query(
        `
          UPDATE tasks
          SET project_id = $1
          WHERE project_id IN (
            SELECT id
            FROM projects
            WHERE LOWER(name) = LOWER($2)
              AND id <> $1
          )
        `,
        [project.id, project.name],
      );

      await queryRunner.query(
        `
          DELETE FROM projects
          WHERE LOWER(name) = LOWER($1)
            AND id <> $2
        `,
        [project.name, project.id],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const project of SYSTEM_PROJECTS_REGISTRY) {
      await queryRunner.query(
        `
          DELETE FROM projects
          WHERE id = $1
        `,
        [project.id],
      );
    }
  }
}
