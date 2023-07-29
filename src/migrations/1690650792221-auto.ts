import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1690650792221 implements MigrationInterface {
    name = 'Auto1690650792221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`type\` CHANGE \`uid\` \`uuid\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`group\` DROP COLUMN \`uuid\``);
        await queryRunner.query(`ALTER TABLE \`group\` ADD \`uuid\` varchar(36) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group\` DROP COLUMN \`uuid\``);
        await queryRunner.query(`ALTER TABLE \`group\` ADD \`uuid\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`type\` CHANGE \`uuid\` \`uid\` varchar(255) NOT NULL`);
    }

}
