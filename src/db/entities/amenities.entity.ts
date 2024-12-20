import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HotelEntity } from "./hotel.entity";

export enum AttachmentType {
    IMAGE = 'IMAGE',
    FILE = 'FILE',
}

@Entity("amenities")
export class  AmenitiesEntity{

    @PrimaryGeneratedColumn()
    id: number;

    //setting up foreign key for hotel entity inside of amenities entity. 
    @ManyToOne(()=>HotelEntity, (hotel)=>hotel.id,{onDelete:"CASCADE"}) //when the main entity which is the hotel is delted the attachment is deleted.
    @JoinColumn({name:"hotel_id"})
    hotel: HotelEntity;

    @Column({type:"varchar"})
    title: string;

}