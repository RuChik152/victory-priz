import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1689278356843 implements MigrationInterface {
    name = 'Auto1689278356843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`type\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`group\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`group\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`type\``);
    }

}
