import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelEntity, HotelStatus } from 'src/db/entities/hotel.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/db/entities/user.entity';

@Injectable()
export class AdminService {

  constructor(@InjectRepository(HotelEntity) private readonly hotelRepo:Repository<HotelEntity>,
  @InjectRepository(UserEntity) private readonly userRepo:Repository<UserEntity>) {};

  //returning all the hotels that have a pending status.
  async getPendingHotels() {
    return this.hotelRepo.find({where:{status:HotelStatus.PENDING}});
  }

  //this is a better way to change status where we can pass the new status as a parameter.
  async changeHotelStatus(id: number, newStatus :HotelStatus) {
    const checkHotel =await this.hotelRepo.findOne({where:{id:id}});
    if(!checkHotel)
      throw new HttpException('The hotel id is not correct.',HttpStatus.NOT_FOUND);

    checkHotel.status = newStatus;
    const savedHotel = await this.hotelRepo.save(checkHotel);

    return {message: `the hotel has been accepted successfully`, savedHotel};
  }

  //is there a better way to make no dublicate code.
  // async acceptPendingHotels(id: number) {

  //   const checkHotel =await this.hotelRepo.findOne({where:{id:id}});
  //   if(!checkHotel)
  //     throw new HttpException('The hotel id is not correct.',HttpStatus.NOT_FOUND);

  //   checkHotel.status = HotelStatus.ACCEPTED;
  //   const savedHotel = await this.hotelRepo.save(checkHotel);

  //   return {message: `the hotel has been accepted successfully`, savedHotel};
  // }

  // async declinePendingHotels(id: number) {
  //   const checkHotel =await this.hotelRepo.findOne({where:{id:id}});
  //   if(!checkHotel)
  //     throw new HttpException('The hotel id is not correct.',HttpStatus.NOT_FOUND);

  //   checkHotel.status = HotelStatus.ACCEPTED;
  //   const savedHotel = await this.hotelRepo.save(checkHotel);

  //   return {message: `the hotel has been accepted successfully`, savedHotel};
  // }


  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
