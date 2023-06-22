import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1687453396838 implements MigrationInterface {
    name = 'Auto1687453396838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`auth_status\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`auth_status\``);
    }

}
