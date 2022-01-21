import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1642771539236 implements MigrationInterface {
    name = 'Init1642771539236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "discord_id " character varying NOT NULL, "username" character varying NOT NULL, "discriminator" character varying NOT NULL, "avatar" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
