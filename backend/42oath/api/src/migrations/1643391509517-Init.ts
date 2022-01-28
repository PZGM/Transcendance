import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1643391509517 implements MigrationInterface {
    name = 'Init1643391509517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sessions" ("expiredAt" bigint NOT NULL, "id" character varying(255) NOT NULL, "json" text NOT NULL, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4c1989542e47d9e3b98fe32c67" ON "sessions" ("expiredAt") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "intra_id " character varying NOT NULL, "login" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "img_url" character varying NOT NULL, CONSTRAINT "UQ_03fdc0fd5d99b58560c4ca6e0ba" UNIQUE ("intra_id "), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4c1989542e47d9e3b98fe32c67"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
    }

}
