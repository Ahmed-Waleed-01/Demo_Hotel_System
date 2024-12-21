import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedFKInHotels1733821810417 implements MigrationInterface {
    name = 'AddedFKInHotels1733821810417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" ADD "manager_id" integer`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD CONSTRAINT "UQ_23d9fab5cd63fffc2dcf09247d8" UNIQUE ("manager_id")`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD CONSTRAINT "FK_23d9fab5cd63fffc2dcf09247d8" FOREIGN KEY ("manager_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP CONSTRAINT "FK_23d9fab5cd63fffc2dcf09247d8"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP CONSTRAINT "UQ_23d9fab5cd63fffc2dcf09247d8"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "manager_id"`);
    }

}
