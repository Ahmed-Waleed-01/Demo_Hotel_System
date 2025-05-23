import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { baseMigrationAttributes } from "../entities/base-entity";

export class CreatingTables1734953756653 implements MigrationInterface {
    name = 'CreatingTables1734953756653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'HOTELMANAGER', 'USER')`
        );

        await queryRunner.query(
          `CREATE TYPE "HotelStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED')`
        );
    
        //creating user table.
        await queryRunner.createTable(
          new Table({
            name: 'users',
            columns: [
              ...baseMigrationAttributes,
    
              {
                name: 'first_name',
                type: 'varchar',
                isNullable: true,
              },
              {
                name: 'last_name',
                type: 'varchar',
                isNullable: true,
              },
              {
                name: 'email',
                type: 'varchar',
                isUnique: true,
                isNullable: false,
              },
              {
                name: 'password',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'role',
                type: 'enum',
                enum: ['ADMIN', 'HOTELMANAGER', 'USER'],
                enumName: 'UserRole',
                default: `'USER'`,
                isNullable: false,
              },
            ],
          }),
          true,
        );

        //creating hotels table.
        await queryRunner.createTable(new Table({
          name: 'hotels',
          columns: [
            ...baseMigrationAttributes,
  
            {
              name: 'name',
              type: 'varchar',
              isNullable: false,
              isUnique:true,
            },
            {
              name: 'address',
              type: 'varchar',
            },
            {
              name: 'email',
              type: 'varchar',
              isNullable:false,
              isUnique:true,
            },
            {
              name: 'description',
              type: 'varchar',
              isNullable:true,
            },
            {
              name: 'status',
              type: 'enum',
              enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
              enumName: 'HotelStatus',
              default: `'PENDING'`,
              isNullable: false,
            },
            {
              name: 'manager_id',
              type: 'int4',
              isNullable: true,
            },
          ],
        }),
        true, // true for creating foreign keys.
      );

      await queryRunner.createForeignKey(
        'hotels',
        new TableForeignKey({
          columnNames: ['manager_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          name: 'fk_hotel_manager',
        }),
      );

      }



      public async down(queryRunner: QueryRunner): Promise<void> {

        //dropping the users table.
        await queryRunner.query(`DROP TYPE "UserRole"`);
        await queryRunner.dropTable('users');

        //dropping the hotels table.
        await queryRunner.dropForeignKey('hotels', 'fk_hotel_manager');
        await queryRunner.query(`DROP TYPE "HotelStatus"`);
        await queryRunner.dropTable('hotels');

      }

}