import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1690104693225 implements MigrationInterface {
  name = 'Auto1690104693225';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`sales_percent\` int NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`sales_percent\``,
    );
  }
}
