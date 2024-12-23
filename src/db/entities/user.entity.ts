import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base-entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  HOTELMANAGER = 'HOTELMANAGER',
  USER = 'USER',
}

@Entity('users')
export class UserEntity extends BaseEntity {

  @Column({ nullable: true})
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({type:'varchar'})
  @Exclude()
  password: string;

  @Column({type:'enum', enum: UserRole, default:UserRole.USER})
  role: UserRole

  // @PrimaryGeneratedColumn()
  // id: number;

  // @CreateDateColumn()
  // created_at: Date;
}