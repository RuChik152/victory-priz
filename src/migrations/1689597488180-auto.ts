import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1689597488180 implements MigrationInterface {
  name = 'Auto1689597488180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`presentation_name\` varchar(255) NOT NULL, \`art\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`description\` text NOT NULL, \`image_data\` mediumblob NOT NULL, \`image_link\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`group\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL DEFAULT 'user name', \`pass\` varchar(255) NOT NULL, \`auth_status\` tinyint NOT NULL DEFAULT 0, \`confirmation\` tinyint NOT NULL DEFAULT 0, \`confirm_id\` varchar(255) NOT NULL DEFAULT '', \`accessToken\` text NOT NULL, \`refreshToken\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`descriptions\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``,
    );
    await queryRunner.query(`DROP TABLE \`order\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`product\``);
  }
}
