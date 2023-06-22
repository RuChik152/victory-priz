import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1687377597931 implements MigrationInterface {
    name = 'Auto1687377597931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`confirmation\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`confirmation\``);
    }

}
