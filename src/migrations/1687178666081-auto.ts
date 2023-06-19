import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1687178666081 implements MigrationInterface {
    name = 'Auto1687178666081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(255) NOT NULL DEFAULT 'user name'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
    }

}
