import { CloudinaryService } from './../../utils/cloudinary/cloudinary.service';
import { CreateHotelDto } from '../../dtos/hotel/create-hotel-dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateManagerDto } from '../../dtos/manager/create-manager.dto';
import { UpdateManagerDto } from '../../dtos/manager/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelEntity } from 'src/db/entities/hotel.entity';
import { Or, Repository } from 'typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { console } from 'inspector';
import { PhoneNumberEntity } from 'src/db/entities/phoneNumber.entity';
import { AttachmentEntity } from 'src/db/entities/attachment.entity';
import { CreatePhoneNumberDto } from '../../dtos/phoneNumber/create-phoneNum-dto';
import { PhoneNUmberDto } from '../../dtos/phoneNumber/phoneNum-dto';
import { AmenityDto } from 'src/dtos/amenity/amenity-dto';
import { CreateAmenityDto } from 'src/dtos/amenity/create-amenity';
import { AmenitiesEntity } from 'src/db/entities/amenities.entity';
import { CreateAttachmentDto } from 'src/dtos/attachments/create-attachment-dto';
import { AttachmentType } from 'src/enums/attachments-enum';


@Injectable()
export class ManagerService {
  

  constructor(@InjectRepository(HotelEntity) private readonly hotelRepo: Repository<HotelEntity>,
@InjectRepository(PhoneNumberEntity)private readonly phoneNumRepo: Repository<PhoneNumberEntity>,
@InjectRepository(AttachmentEntity) private readonly attachmentRepo: Repository<AttachmentEntity>,
@InjectRepository(AmenitiesEntity) private readonly amenitiesRepo: Repository<AmenitiesEntity>,
private readonly cloudinaryService:CloudinaryService){}

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

   //checking if there is a hotel with the same name or a hotel with the same contact number.
   checkHotel = await this.hotelRepo.findOne({where:{email:createHotelDto.email}});
   if(checkHotel !== null)
    throw new HttpException("A hotel with the same email already exists",HttpStatus.CONFLICT);

   //checking if there is a hotel with the same name or a hotel with the same contact number.
   checkHotel = await this.hotelRepo.findOne({where:{name:createHotelDto.name}});
   if(checkHotel !== null)
    throw new HttpException("A hotel with the same name already exists",HttpStatus.CONFLICT);

   //saving the hotel into the database
   let newHotel = this.hotelRepo.create({...createHotelDto,manager_id:manager});
   //intializing attachments in new hotel
   newHotel.attachments = [];
   newHotel = await this.hotelRepo.save(newHotel);

   //saving the amenities in the amenities table and adding the hotel fk.
   const amenities : CreateAmenityDto[] = createHotelDto.amenities;
   for (let index = 0; index < amenities.length; index++) {
    const curAmenity = amenities[index];
    const newAmenity = this.amenitiesRepo.create({...curAmenity, hotel:newHotel});
    this.amenitiesRepo.save(newAmenity)
   }
   //saving the phone numbers in the phoneNumbers table and adding the hotel fk.
   for (let i = 0; i < phoneNumbers.length; i++) {
    const curPhone = phoneNumbers[i];
    const newPhone = this.phoneNumRepo.create({...curPhone,hotel:newHotel});
    this.phoneNumRepo.save(newPhone)
   }

    return newHotel;
  }

  async addImgToHotel(req:Request, image:Express.Multer.File) {
    const manager = req['user'];

    //getting hotel that is asocciated to the manager and using leftJoinAndSelect  
    let checkHotel= await this.hotelRepo.createQueryBuilder("hotel").leftJoinAndSelect('hotel.attachments', 'attachments').where('hotel.manager_id = :managerId',{managerId:manager.id}).getOne();
    if(checkHotel === null || checkHotel === undefined)
      throw new HttpException("manager does not have a hotel",HttpStatus.CONFLICT);

    //uploading the image into cloudinary.
    const uploadedImg = await this.cloudinaryService.uploadFile(image);
    
    //creating an attachment and saving it.
    const attachment =this.attachmentRepo.create({attachment_url: uploadedImg.secure_url, type:AttachmentType.IMAGE,hotel:checkHotel});
    await this.attachmentRepo.save(attachment);

    return checkHotel;
  }
}
