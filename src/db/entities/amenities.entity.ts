import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HotelEntity } from "./hotel.entity";
import { BaseEntity } from "./base-entity";

@Entity("amenities")
export class  AmenitiesEntity extends BaseEntity{

    //setting up foreign key for hotel entity inside of amenities entity. 
    @ManyToOne(()=>HotelEntity, (hotel)=>hotel.id,{onDelete:"CASCADE"}) //when the main entity which is the hotel is delted the attachment is deleted.
    @JoinColumn({name:"hotel_id"})
    hotel: HotelEntity;

    @Column({type:"varchar"})
    title: string;

}