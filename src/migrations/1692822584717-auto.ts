import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1692822584717 implements MigrationInterface {
    name = 'Auto1692822584717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`tag\` varchar(255) NOT NULL DEFAULT '#product', \`presentation_name\` varchar(255) NOT NULL, \`art\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`description\` text NOT NULL, \`image_data\` mediumblob NOT NULL, \`image_link\` varchar(255) NOT NULL, \`sales\` varchar(255) NOT NULL DEFAULT 'no-sales', \`sales_percent\` int NOT NULL DEFAULT '0', \`typeId\` varchar(36) NULL, \`groupId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`type\` (\`id\` varchar(36) NOT NULL, \`type_name\` varchar(255) NOT NULL, \`groupId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group\` (\`id\` varchar(36) NOT NULL, \`group_name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`descriptions\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usergroup\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL DEFAULT 'user name', \`pass\` varchar(255) NOT NULL, \`auth_status\` tinyint NOT NULL DEFAULT 0, \`confirmation\` tinyint NOT NULL DEFAULT 0, \`confirm_id\` varchar(255) NOT NULL DEFAULT '', \`accessToken\` text NOT NULL, \`refreshToken\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usergroup_users_user\` (\`usergroupId\` varchar(36) NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_fc2a018e0b149e0a2c4ac028fb\` (\`usergroupId\`), INDEX \`IDX_f90ec5d3ec57913c112c0e9de8\` (\`userId\`), PRIMARY KEY (\`usergroupId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_53bafe3ecc25867776c07c9e666\` FOREIGN KEY (\`typeId\`) REFERENCES \`type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_9ff07d9b0075484eb946e79e567\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`type\` ADD CONSTRAINT \`FK_e3a2ad7ea6e71477dbdc61cf999\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usergroup_users_user\` ADD CONSTRAINT \`FK_fc2a018e0b149e0a2c4ac028fb6\` FOREIGN KEY (\`usergroupId\`) REFERENCES \`usergroup\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`usergroup_users_user\` ADD CONSTRAINT \`FK_f90ec5d3ec57913c112c0e9de8b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO \`usergroup\` (id, name) VALUES ('ba7f2bfd-0000-0000-0000-000000000000','root')`);
        await queryRunner.query(`INSERT INTO \`usergroup\` (id, name) VALUES ('ba7f2bfd-0000-0000-0000-000000000001','user')`);
        await queryRunner.query(`INSERT INTO \`usergroup\` (id, name) VALUES ('ba7f2bfd-0000-0000-0000-000000000002','guest')`);
        await queryRunner.query(`INSERT INTO \`usergroup\` (id, name) VALUES ('ba7f2bfd-0000-0000-0000-000000000003','custom')`);
        await queryRunner.query(`INSERT INTO \`user\` (id, email, name, pass, auth_status, confirmation, accessToken,refreshToken) value (1, 'admin@admin.admin', 'admin', '$2b$10$L2wJwnzLCbB6YBy7iNx7i.nq36YYLkGhu1.7MuAkyMvS2NjdhVB62', 1,1, '','')`);
        await queryRunner.query(`INSERT INTO \`user\` (id, email, name, pass, auth_status, confirmation, accessToken,refreshToken) value (2, 'user@user.user', 'user', '$2b$10$L2wJwnzLCbB6YBy7iNx7i.nq36YYLkGhu1.7MuAkyMvS2NjdhVB62', 1,1, '','')`);
        await queryRunner.query(`INSERT INTO \`user\` (id, email, name, pass, auth_status, confirmation, accessToken,refreshToken) value (3, 'guest@guest.guest', 'guest', '$2b$10$L2wJwnzLCbB6YBy7iNx7i.nq36YYLkGhu1.7MuAkyMvS2NjdhVB62', 1,1, '','')`);
        await queryRunner.query(`INSERT INTO \`user\` (id, email, name, pass, auth_status, confirmation, accessToken,refreshToken) value (4, 'test@test.test', 'test', '$2b$10$L2wJwnzLCbB6YBy7iNx7i.nq36YYLkGhu1.7MuAkyMvS2NjdhVB62', 1,1, '','')`);
        await queryRunner.query(`INSERT INTO \`usergroup_users_user\` (userId, usergroupId) value (1,'ba7f2bfd-0000-0000-0000-000000000000')`);
        await queryRunner.query(`INSERT INTO \`usergroup_users_user\` (userId, usergroupId) value (2,'ba7f2bfd-0000-0000-0000-000000000001')`);
        await queryRunner.query(`INSERT INTO \`usergroup_users_user\` (userId, usergroupId) value (2,'ba7f2bfd-0000-0000-0000-000000000003')`);
        await queryRunner.query(`INSERT INTO \`usergroup_users_user\` (userId, usergroupId) value (3,'ba7f2bfd-0000-0000-0000-000000000002')`);
        await queryRunner.query(`INSERT INTO \`usergroup_users_user\` (userId, usergroupId) value (4,'ba7f2bfd-0000-0000-0000-000000000001')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usergroup_users_user\` DROP FOREIGN KEY \`FK_f90ec5d3ec57913c112c0e9de8b\``);
        await queryRunner.query(`ALTER TABLE \`usergroup_users_user\` DROP FOREIGN KEY \`FK_fc2a018e0b149e0a2c4ac028fb6\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`type\` DROP FOREIGN KEY \`FK_e3a2ad7ea6e71477dbdc61cf999\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_9ff07d9b0075484eb946e79e567\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_53bafe3ecc25867776c07c9e666\``);
        await queryRunner.query(`DROP INDEX \`IDX_f90ec5d3ec57913c112c0e9de8\` ON \`usergroup_users_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_fc2a018e0b149e0a2c4ac028fb\` ON \`usergroup_users_user\``);
        await queryRunner.query(`DROP TABLE \`usergroup_users_user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`usergroup\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`group\``);
        await queryRunner.query(`DROP TABLE \`type\``);
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
