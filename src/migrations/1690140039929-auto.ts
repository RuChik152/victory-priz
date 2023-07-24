import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1690140039929 implements MigrationInterface {
  name = 'Auto1690140039929';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`sales\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`sales\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`sales_percent\` \`sales_percent\` int NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`sales_percent\` \`sales_percent\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`sales\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`sales\` bit NOT NULL DEFAULT 'b'0''`,
    );
  }
}
