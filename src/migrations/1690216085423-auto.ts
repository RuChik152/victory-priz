import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1690216085423 implements MigrationInterface {
  name = 'Auto1690216085423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`sales\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`sales\` varchar(255) NOT NULL DEFAULT 'no-sales'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`sales\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`sales\` tinyint NOT NULL DEFAULT '0'`,
    );
  }
}
