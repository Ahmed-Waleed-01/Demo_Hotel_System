import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  HOTELMANAGER = 'HOTELMANAGER',
  USER = 'USER',
}

@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn()
  created_at: Date;

}