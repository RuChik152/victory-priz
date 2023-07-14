import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1689283768856 implements MigrationInterface {
    name = 'Auto1689283768856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`image\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`image\` varchar(255) NOT NULL`);
    }

}
