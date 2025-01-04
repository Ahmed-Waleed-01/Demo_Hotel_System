import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HotelEntity } from "./hotel.entity";
import { BaseEntity } from "./base-entity";
import { AttachmentType } from "src/enums/attachments-enum";

@Entity("attachments")
export class  AttachmentEntity extends BaseEntity{

    //setting up foreign key for hotel entity inside of attachment entity. 
    @ManyToOne(()=>HotelEntity, (hotel)=>hotel.id,{onDelete:"CASCADE"}) //when the main entity which is the hotel is delted the attachment is deleted.
    @JoinColumn({name:"hotel_id"})
    hotel: HotelEntity;

    @Column({type:'enum', enum: AttachmentType})
    type: AttachmentType;

    @Column({ unique: true })
    attachment_url: string;
}