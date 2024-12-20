import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { PhoneNumberEntity } from './phoneNumber.entity';
import { AttachmentEntity } from './attachment.entity';

export enum HotelStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@Entity('hotels')
export class HotelEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  name: string;

  @Column({})
  address: string;

  // @Column({ unique: true , type:'bigint'})
  // contactNumber: number;

  @Column({type:'varchar'})
  email: string;

  @Column({type:'varchar'})
  description: string;

  @Column({type:'varchar'})
  amenities: string;

  @Column({type:'enum', enum: HotelStatus, default:HotelStatus.PENDING})
  status: HotelStatus

  @OneToOne(()=> UserEntity, (manager)=>manager.id, {})
  @JoinColumn({name:'manager_id'})
  manager_id : UserEntity;

  @OneToMany(()=>PhoneNumberEntity, (phoneNumber)=>phoneNumber.hotel)
  phoneNumbers: PhoneNumberEntity[];

  @OneToMany(()=> AttachmentEntity, (attachment)=>attachment.hotel)
  attachments: AttachmentEntity[];

  @CreateDateColumn()
  created_at: Date;

}