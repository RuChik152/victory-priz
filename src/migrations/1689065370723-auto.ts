import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1689065370723 implements MigrationInterface {
    name = 'Auto1689065370723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`image_data\` mediumblob NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`image_data\``);
    }

}
