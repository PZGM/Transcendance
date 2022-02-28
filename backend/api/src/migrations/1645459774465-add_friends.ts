import {MigrationInterface, QueryRunner} from "typeorm";

export class addFriends1645459774465 implements MigrationInterface {
    name = 'addFriends1645459774465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "friends" integer array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "friends"`);
    }

}
