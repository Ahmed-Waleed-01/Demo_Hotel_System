import { CreateHotelDto } from './../dto/create-hotel-dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { UpdateManagerDto } from '../dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelEntity } from 'src/db/entities/hotel.entity';
import { Or, Repository } from 'typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { console } from 'inspector';


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

  constructor(@InjectRepository(HotelEntity) private readonly hotelRepo: Repository<HotelEntity>){}

  async addHotel(req:Request ,createHotelDto: CreateHotelDto) {
    const manager = req['user'];

    //check if manager had already added a hotel from before.
   let checkHotel= await this.hotelRepo.createQueryBuilder("hotel").where('hotel.manager_id = :managerId',{managerId:manager.id}).getOne();
   if(checkHotel !== null)
   throw new HttpException("manager already created a hotel",HttpStatus.CONFLICT);

   //checking if there is a hotel with the same name or a hotel with the same contact number.
   checkHotel = await this.hotelRepo.findOne({where:[{name:createHotelDto.name}, {contactNumber:createHotelDto.contactNumber}]});
   if(checkHotel !== null)
   {
     if(createHotelDto.name === checkHotel.name)
       throw new HttpException("A hotel with the same name already exists",HttpStatus.CONFLICT);
     else
       throw new HttpException("A hotel with the same contact number already exists",HttpStatus.CONFLICT);
   }
    
   const newHotel = this.hotelRepo.create({...createHotelDto,manager_id:manager});

    return await this.hotelRepo.save(newHotel);
  }

}
