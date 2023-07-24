import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1690101771327 implements MigrationInterface {
  name = 'Auto1690101771327';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`sales\` tinyint NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`sales\``);
  }
}
