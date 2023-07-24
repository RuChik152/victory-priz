import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1690110631937 implements MigrationInterface {
  name = 'Auto1690110631937';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`sales\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`sales\` bit NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`sales\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`sales\` tinyint NOT NULL DEFAULT '0'`,
    );
  }
}
