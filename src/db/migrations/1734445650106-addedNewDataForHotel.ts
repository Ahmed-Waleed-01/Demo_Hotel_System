import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNewDataForHotel1734445650106 implements MigrationInterface {
    name = 'AddedNewDataForHotel1734445650106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."attachments_type_enum" RENAME TO "attachments_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."attachments_type_enum" AS ENUM('image', 'FILE')`);
        await queryRunner.query(`ALTER TABLE "attachments" ALTER COLUMN "type" TYPE "public"."attachments_type_enum" USING "type"::"text"::"public"."attachments_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."attachments_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."attachments_type_enum_old" AS ENUM('LANDLINE', 'MOBILE')`);
        await queryRunner.query(`ALTER TABLE "attachments" ALTER COLUMN "type" TYPE "public"."attachments_type_enum_old" USING "type"::"text"::"public"."attachments_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."attachments_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."attachments_type_enum_old" RENAME TO "attachments_type_enum"`);
    }

}
