import { MigrationInterface, QueryRunner } from "typeorm";

export class SmallFix1734596578819 implements MigrationInterface {
    name = 'SmallFix1734596578819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phone_numbers" DROP CONSTRAINT "FK_e2385fa080643470ebcd373000c"`);
        await queryRunner.query(`ALTER TABLE "attachments" DROP CONSTRAINT "FK_f5153e5aadd367d2d3535ea5124"`);
        await queryRunner.query(`ALTER TABLE "phone_numbers" ADD CONSTRAINT "FK_e2385fa080643470ebcd373000c" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attachments" ADD CONSTRAINT "FK_f5153e5aadd367d2d3535ea5124" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attachments" DROP CONSTRAINT "FK_f5153e5aadd367d2d3535ea5124"`);
        await queryRunner.query(`ALTER TABLE "phone_numbers" DROP CONSTRAINT "FK_e2385fa080643470ebcd373000c"`);
        await queryRunner.query(`ALTER TABLE "attachments" ADD CONSTRAINT "FK_f5153e5aadd367d2d3535ea5124" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phone_numbers" ADD CONSTRAINT "FK_e2385fa080643470ebcd373000c" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
