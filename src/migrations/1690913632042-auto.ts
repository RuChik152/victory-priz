import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1690913632042 implements MigrationInterface {
    name = 'Auto1690913632042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`type\` (\`id\` varchar(36) NOT NULL, \`type_name\` varchar(255) NOT NULL, \`groupId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group\` (\`id\` varchar(36) NOT NULL, \`group_name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`tag\` varchar(255) NOT NULL DEFAULT '#product', \`presentation_name\` varchar(255) NOT NULL, \`art\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`description\` text NOT NULL, \`image_data\` mediumblob NOT NULL, \`image_link\` varchar(255) NOT NULL, \`sales\` varchar(255) NOT NULL DEFAULT 'no-sales', \`sales_percent\` int NOT NULL DEFAULT '0', \`typeId\` varchar(36) NULL, \`groupId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`item\` (\`id\` varchar(36) NOT NULL, \`productId\` varchar(36) NULL, \`groupId\` varchar(36) NULL, \`typeId\` varchar(36) NULL, UNIQUE INDEX \`REL_ab25455f602addda94c12635c6\` (\`productId\`), UNIQUE INDEX \`REL_94c5f1b2d8b84ca708881e2430\` (\`groupId\`), UNIQUE INDEX \`REL_ff0c140f0cffd26d4c726e2842\` (\`typeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`descriptions\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL DEFAULT 'user name', \`pass\` varchar(255) NOT NULL, \`auth_status\` tinyint NOT NULL DEFAULT 0, \`confirmation\` tinyint NOT NULL DEFAULT 0, \`confirm_id\` varchar(255) NOT NULL DEFAULT '', \`accessToken\` text NOT NULL, \`refreshToken\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`type\` ADD CONSTRAINT \`FK_e3a2ad7ea6e71477dbdc61cf999\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_53bafe3ecc25867776c07c9e666\` FOREIGN KEY (\`typeId\`) REFERENCES \`type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_9ff07d9b0075484eb946e79e567\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item\` ADD CONSTRAINT \`FK_ab25455f602addda94c12635c60\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item\` ADD CONSTRAINT \`FK_94c5f1b2d8b84ca708881e2430e\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item\` ADD CONSTRAINT \`FK_ff0c140f0cffd26d4c726e2842c\` FOREIGN KEY (\`typeId\`) REFERENCES \`type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`item\` DROP FOREIGN KEY \`FK_ff0c140f0cffd26d4c726e2842c\``);
        await queryRunner.query(`ALTER TABLE \`item\` DROP FOREIGN KEY \`FK_94c5f1b2d8b84ca708881e2430e\``);
        await queryRunner.query(`ALTER TABLE \`item\` DROP FOREIGN KEY \`FK_ab25455f602addda94c12635c60\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_9ff07d9b0075484eb946e79e567\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_53bafe3ecc25867776c07c9e666\``);
        await queryRunner.query(`ALTER TABLE \`type\` DROP FOREIGN KEY \`FK_e3a2ad7ea6e71477dbdc61cf999\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP INDEX \`REL_ff0c140f0cffd26d4c726e2842\` ON \`item\``);
        await queryRunner.query(`DROP INDEX \`REL_94c5f1b2d8b84ca708881e2430\` ON \`item\``);
        await queryRunner.query(`DROP INDEX \`REL_ab25455f602addda94c12635c6\` ON \`item\``);
        await queryRunner.query(`DROP TABLE \`item\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`group\``);
        await queryRunner.query(`DROP TABLE \`type\``);
    }

}
