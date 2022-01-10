import {MigrationInterface, QueryRunner} from "typeorm";

export class crea1641569392945 implements MigrationInterface {
    name = 'crea1641569392945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "creation_at"`);
    }

}
