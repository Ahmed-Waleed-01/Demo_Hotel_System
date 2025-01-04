import { TableColumnOptions,Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  created_at?: Date;

  // @Column({ nullable: true })
  // createdBy?: string;

  // @Column({ nullable: true })
  // lastModifiedBy?: string;

  // @Column({ nullable: true })
  // lastModifiedDate?: Date;
}

export const baseMigrationAttributes: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'int4',
    isPrimary: true,
    isGenerated: true,
    generationStrategy: 'increment',
  },
  {
    name: 'created_at',
    type: 'timestamp',
    isNullable: true,
    default: 'CURRENT_TIMESTAMP',
  },
  // {
  //   name: 'lastModifiedBy',
  //   type: 'varchar',
  //   isNullable: true,
  // },
  // {
  //   name: 'lastModifiedDate',
  //   type: 'timestamp',
  //   isNullable: true,
  // },
  // {
  //   name: 'createdBy',
  //   type: 'varchar',
  //   isNullable: true,
  // },
];