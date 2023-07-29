import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1690651312443 implements MigrationInterface {
    name = 'Auto1690651312443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group\` DROP COLUMN \`uuid\``);
        await queryRunner.query(`ALTER TABLE \`type\` DROP FOREIGN KEY \`FK_e3a2ad7ea6e71477dbdc61cf999\``);
        await queryRunner.query(`ALTER TABLE \`type\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`type\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`type\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`type\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`type\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`ALTER TABLE \`type\` ADD \`groupId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_9ff07d9b0075484eb946e79e567\``);
        await queryRunner.query(`ALTER TABLE \`group\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`group\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`group\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`group\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`DROP INDEX \`REL_9ff07d9b0075484eb946e79e56\` ON \`product\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`groupId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD UNIQUE INDEX \`IDX_9ff07d9b0075484eb946e79e56\` (\`groupId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_9ff07d9b0075484eb946e79e56\` ON \`product\` (\`groupId\`)`);
        await queryRunner.query(`ALTER TABLE \`type\` ADD CONSTRAINT \`FK_e3a2ad7ea6e71477dbdc61cf999\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_9ff07d9b0075484eb946e79e567\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_9ff07d9b0075484eb946e79e567\``);
        await queryRunner.query(`ALTER TABLE \`type\` DROP FOREIGN KEY \`FK_e3a2ad7ea6e71477dbdc61cf999\``);
        await queryRunner.query(`DROP INDEX \`REL_9ff07d9b0075484eb946e79e56\` ON \`product\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP INDEX \`IDX_9ff07d9b0075484eb946e79e56\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`groupId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_9ff07d9b0075484eb946e79e56\` ON \`product\` (\`groupId\`)`);
        await queryRunner.query(`ALTER TABLE \`group\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`group\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`group\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`group\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_9ff07d9b0075484eb946e79e567\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`type\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`ALTER TABLE \`type\` ADD \`groupId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`type\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`type\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`type\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`type\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`type\` ADD CONSTRAINT \`FK_e3a2ad7ea6e71477dbdc61cf999\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group\` ADD \`uuid\` varchar(36) NOT NULL`);
    }

}
