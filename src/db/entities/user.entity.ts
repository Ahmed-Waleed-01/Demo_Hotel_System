import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { UserRole } from 'src/enums/user-enum';

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

}