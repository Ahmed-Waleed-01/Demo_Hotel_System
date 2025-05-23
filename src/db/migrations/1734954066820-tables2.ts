import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { baseMigrationAttributes } from "../entities/base-entity";

export class CreatingTables1734954066820 implements MigrationInterface {
    name = 'CreatingTables1734954066820'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
          `CREATE TYPE "AttachmentType" AS ENUM ('IMAGE', 'FILE')`
        );
        
        await queryRunner.query(
            `CREATE TYPE "PhoneNumType" AS ENUM ('LANDLINE', 'MOBILE')`
        );  

        //creating amenities table.
        await queryRunner.createTable(new Table({
            name: 'amenities',
            columns: [
              ...baseMigrationAttributes,
    
              {
                name: 'title',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'hotel_id',
                type: 'int4',
                isNullable: false,
              },
            ],
          }),
          true,
        );

        await queryRunner.createForeignKey(
          'amenities',
          new TableForeignKey({
            columnNames: ['hotel_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'hotels',
            name: 'fk_hotel_amenity',
            onDelete: 'CASCADE',
          }),
        );
    

        //creating attachments table.
        await queryRunner.createTable(new Table({
            name: 'attachments',
            columns: [
                ...baseMigrationAttributes,
                {
                    name: 'type',
                    type: 'enum',
                    enum: ['IMAGE', 'FILE'],
                    enumName: 'AttachmentType',
                    isNullable: false,
                },
                {
                    name: 'attachment_url',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'hotel_id',
                    type: 'int4',
                    isNullable: false,
                },
            ],
        }),
        true,
        );

        await queryRunner.createForeignKey(
            'attachments',
            new TableForeignKey({
              columnNames: ['hotel_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'hotels',
              name: 'fk_hotel_attachment',
              onDelete: 'CASCADE',
            }),
        );

        //creating phoneNumber table.
        await queryRunner.createTable(new Table({
            name: 'phone_numbers',
            columns: [
                ...baseMigrationAttributes,
                {
                    name: 'type',
                    type: 'enum',
                    enum: ['LANDLINE', 'MOBILE'],
                    enumName: 'PhoneNumType',
                    isNullable: false,
                },
                {
                    name: 'phone_number',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'hotel_id',
                    type: 'int4',
                    isNullable: false,
                },
            ],
        }),
        true,
        );

        await queryRunner.createForeignKey(
            'phone_numbers',
            new TableForeignKey({
              columnNames: ['hotel_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'hotels',
              name: 'fk_hotel_PhoneNums',
              onDelete: 'CASCADE',
            }),
        );

      }



      public async down(queryRunner: QueryRunner): Promise<void> {

        //dropping the attachments table.
        await queryRunner.query(`DROP TYPE "AttachmentType"`);
        await queryRunner.dropForeignKey('attachments', 'fk_hotel_attachment');
        await queryRunner.dropTable('attachments');

        //dropping the phone numbers table.
        await queryRunner.query(`DROP TYPE "PhoneNumType"`);
        await queryRunner.dropForeignKey('phone_numbers', 'fk_hotel_PhoneNums');
        await queryRunner.dropTable('phone_numbers');

        //dropping the amenities table.
        await queryRunner.dropForeignKey('amenities', 'fk_hotel_amenity');
        await queryRunner.dropTable('amenities');

      }

}