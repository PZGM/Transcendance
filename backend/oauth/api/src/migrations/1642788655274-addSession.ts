import {MigrationInterface, QueryRunner} from "typeorm";

export class addSession1642788655274 implements MigrationInterface {
    name = 'addSession1642788655274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sessions" ("expiredAt" bigint NOT NULL, "id" character varying(255) NOT NULL, "json" text NOT NULL, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4c1989542e47d9e3b98fe32c67" ON "sessions" ("expiredAt") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_3c455d1634561d23f2f2269db41" UNIQUE ("discord_id ")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_3c455d1634561d23f2f2269db41"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4c1989542e47d9e3b98fe32c67"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
    }

}
