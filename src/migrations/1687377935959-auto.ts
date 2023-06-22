import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1687377935959 implements MigrationInterface {
    name = 'Auto1687377935959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`accessToken\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refreshToken\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refreshToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`accessToken\``);
    }

}
