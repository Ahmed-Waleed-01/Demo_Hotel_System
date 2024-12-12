import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedPropertyType1733833249695 implements MigrationInterface {
    name = 'ChangedPropertyType1733833249695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP CONSTRAINT "UQ_7cb1e138492339155a4e0b90a28"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "contactNumber"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "contactNumber" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD CONSTRAINT "UQ_7cb1e138492339155a4e0b90a28" UNIQUE ("contactNumber")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP CONSTRAINT "UQ_7cb1e138492339155a4e0b90a28"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "contactNumber"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "contactNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD CONSTRAINT "UQ_7cb1e138492339155a4e0b90a28" UNIQUE ("contactNumber")`);
    }

}
