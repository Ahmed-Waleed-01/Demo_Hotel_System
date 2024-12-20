import { CreateHotelDto } from './../dto/create-hotel-dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { UpdateManagerDto } from '../dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelEntity } from 'src/db/entities/hotel.entity';
import { Or, Repository } from 'typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { console } from 'inspector';
import { PhoneNumberEntity } from 'src/db/entities/phoneNumber.entity';
import { AttachmentEntity } from 'src/db/entities/attachment.entity';
import { CreatePhoneNumberDto } from '../dto/create-phoneNum-dto';
import { PhoneNUmberDto } from '../dto/phoneNum-dto';


// async function checkHotelExist(createHotelDto:CreateHotelDto, manager:UserEntity,hotelRepo:Repository<HotelEntity>){

//    //check if manager had already added a hotel from before.
//    let checkHotel= await hotelRepo.createQueryBuilder("hotel").leftJoinAndSelect("hotel.manager_id","manager.id").getOne();

//    if(checkHotel !== null)
//    throw new HttpException("manager already created a hotel",HttpStatus.CONFLICT);

//    //checking if there is a hotel with the same name or a hotel with the same contact number.
//    checkHotel = await hotelRepo.findOne({where:[{name:createHotelDto.name}, {contactNumber:createHotelDto.contactNumber}]});
//    if(checkHotel !== null)
//    {
//      if(createHotelDto.name.localeCompare(checkHotel.name))
//        throw new HttpException("A hotel with the same name already exists",HttpStatus.CONFLICT);
//      else
//        throw new HttpException("A hotel with the same contact number already exists",HttpStatus.CONFLICT);
//    }
  
// }

@Injectable()
export class ManagerService {

  constructor(@InjectRepository(HotelEntity) private readonly hotelRepo: Repository<HotelEntity>,
@InjectRepository(PhoneNumberEntity)private readonly phoneNumRepo: Repository<PhoneNumberEntity>,
@InjectRepository(AttachmentEntity) private readonly attachmentRepo: Repository<AttachmentEntity>){}

  async addHotel(req:Request ,createHotelDto: CreateHotelDto) {
    const manager = req['user'];
    
    //check if manager had already added a hotel from before.
   let checkHotel= await this.hotelRepo.createQueryBuilder("hotel").where('hotel.manager_id = :managerId',{managerId:manager.id}).getOne();
   if(checkHotel !== null)
    throw new HttpException("manager already created a hotel",HttpStatus.CONFLICT);

   //check if any of the entered phone numbers were already used.
   const phoneNumbers : CreatePhoneNumberDto[] = createHotelDto.phoneNumbers;

   for (let i = 0; i < phoneNumbers.length; i++) {
    const curPhone = phoneNumbers[i];
    //if we search through the db and find that the phone num was already used then throw an error
    const ans = await this.phoneNumRepo.findOne({where:{phone_number:curPhone.phone_number}});
    if(ans)
      throw new HttpException("Phone number is already used by a hotel",HttpStatus.CONFLICT);
   }
   

   //no checking on attachments is needed for now.
   /**
    * 
    * section for adding attachments.
    * 
    */

   //checking if there is a hotel with the same name or a hotel with the same contact number.
   checkHotel = await this.hotelRepo.findOne({where:{name:createHotelDto.name}});
   if(checkHotel !== null)
    throw new HttpException("A hotel with the same name already exists",HttpStatus.CONFLICT);

   //saving the hotel into the database
   let newHotel = this.hotelRepo.create({...createHotelDto,manager_id:manager});
   newHotel = await this.hotelRepo.save(newHotel);

   //saving the phone numbers in the phoneNumbers table and adding the hotel fk.
   for (let i = 0; i < phoneNumbers.length; i++) {
    const curPhone = phoneNumbers[i];
    const newPhone = this.phoneNumRepo.create({...curPhone,hotel:newHotel});
    this.phoneNumRepo.save(newPhone)
   }
   
   //saving the attachments in the attachments table and adding the hotel fk.
   for (let i = 0; i < createHotelDto.attachments.length; i++) {
    const curAttachment = createHotelDto.attachments[i];
    const newAttach = this.attachmentRepo.create({...curAttachment,hotel:newHotel});
    this.attachmentRepo.save(newAttach);
   }
   
    return newHotel;
  }

}
