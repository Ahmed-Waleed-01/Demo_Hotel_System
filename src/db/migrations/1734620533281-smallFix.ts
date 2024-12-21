import { MigrationInterface, QueryRunner } from "typeorm";

export class SmallFix1734620533281 implements MigrationInterface {
    name = 'SmallFix1734620533281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "amenities" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "hotel_id" integer, CONSTRAINT "PK_c0777308847b3556086f2fb233e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "amenities" ADD CONSTRAINT "FK_468fe90fa65e979610aa5d45284" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "amenities" DROP CONSTRAINT "FK_468fe90fa65e979610aa5d45284"`);
        await queryRunner.query(`DROP TABLE "amenities"`);
    }

}
