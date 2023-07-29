import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1690651440529 implements MigrationInterface {
    name = 'Auto1690651440529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_9ff07d9b0075484eb946e79e56\` ON \`product\``);
        await queryRunner.query(`ALTER TABLE \`type\` DROP COLUMN \`uuid\``);
        await queryRunner.query(`ALTER TABLE \`type\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`type\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`type\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`type\` DROP FOREIGN KEY \`FK_e3a2ad7ea6e71477dbdc61cf999\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_9ff07d9b0075484eb946e79e567\``);
        await queryRunner.query(`ALTER TABLE \`group\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`group\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`group\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`type\` ADD CONSTRAINT \`FK_e3a2ad7ea6e71477dbdc61cf999\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_9ff07d9b0075484eb946e79e567\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_9ff07d9b0075484eb946e79e567\``);
        await queryRunner.query(`ALTER TABLE \`type\` DROP FOREIGN KEY \`FK_e3a2ad7ea6e71477dbdc61cf999\``);
        await queryRunner.query(`ALTER TABLE \`group\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`group\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`group\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_9ff07d9b0075484eb946e79e567\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`type\` ADD CONSTRAINT \`FK_e3a2ad7ea6e71477dbdc61cf999\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`type\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`type\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`type\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`type\` ADD \`uuid\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_9ff07d9b0075484eb946e79e56\` ON \`product\` (\`groupId\`)`);
    }

}
