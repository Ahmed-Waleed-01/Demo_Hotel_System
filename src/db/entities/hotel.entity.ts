import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { PhoneNumberEntity } from './phoneNumber.entity';
import { AttachmentEntity } from './attachment.entity';
import { AmenitiesEntity } from './amenities.entity';

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

  @Column({type:'varchar'})
  email: string;

  @Column({type:'varchar'})
  description: string;

  @OneToMany(()=>AmenitiesEntity, (amenity)=>amenity.hotel)
  amenities: AmenitiesEntity[];

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