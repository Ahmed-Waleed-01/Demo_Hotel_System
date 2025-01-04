import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HotelEntity } from "./hotel.entity";
import { BaseEntity } from "./base-entity";

export enum PhoneNumType {
    LANDLINE = 'LANDLINE',
    MOBILE = 'MOBILE',
}

@Entity("phone_numbers")
export class  PhoneNumberEntity extends BaseEntity{

    //setting up foreign key for hotel entity inside of phone number entity. 
    @ManyToOne(()=>HotelEntity, (hotel)=>hotel.id,{onDelete:"CASCADE"})
    @JoinColumn({name:"hotel_id"})
    hotel: HotelEntity;

    @Column({type:'enum', enum: PhoneNumType})
    type: PhoneNumType;

    @Column({ unique: true })
    phone_number: string;
    
}