import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1687161841167 implements MigrationInterface {
    name = 'Auto1687161841167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`first_name\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`last_name\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`age\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`age\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`last_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`first_name\` varchar(255) NOT NULL`);
    }

}
