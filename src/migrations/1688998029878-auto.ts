import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1688998029878 implements MigrationInterface {
    name = 'Auto1688998029878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`presentation_name\` varchar(255) NOT NULL, \`art\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`description\` text NOT NULL, \`image\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
