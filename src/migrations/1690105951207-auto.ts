import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1690105951207 implements MigrationInterface {
  name = 'Auto1690105951207';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`sales\` \`sales\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`sales\` \`sales\` tinyint NOT NULL`,
    );
  }
}
