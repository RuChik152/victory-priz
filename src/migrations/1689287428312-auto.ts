import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1689287428312 implements MigrationInterface {
    name = 'Auto1689287428312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`image_link\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`image_link\``);
    }

}
