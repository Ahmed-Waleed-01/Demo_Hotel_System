import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedHotelEntity1733821192736 implements MigrationInterface {
    name = 'AddedHotelEntity1733821192736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."hotels_status_enum" AS ENUM('PENDING', 'ACCEPTED', 'REJECTED')`);
        await queryRunner.query(`CREATE TABLE "hotels" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "contactNumber" character varying NOT NULL, "email" character varying NOT NULL, "description" character varying NOT NULL, "amenities" character varying NOT NULL, "status" "public"."hotels_status_enum" NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_30d048e1a4d30b057739a0ef69c" UNIQUE ("name"), CONSTRAINT "UQ_7cb1e138492339155a4e0b90a28" UNIQUE ("contactNumber"), CONSTRAINT "PK_2bb06797684115a1ba7c705fc7b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hotels"`);
        await queryRunner.query(`DROP TYPE "public"."hotels_status_enum"`);
    }

}
