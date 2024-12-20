import { UpdateUserDto } from '../dto/update-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from 'src/auth/dto/changePassword.dto';
import { PaginationOptions } from 'src/utils/dto/pagination.dto';
import { HotelEntity } from 'src/db/entities/hotel.entity';
import { PhoneNumberEntity } from 'src/db/entities/phoneNumber.entity';
import { AttachmentEntity } from 'src/db/entities/attachment.entity';
import { PhoneNUmberDto } from 'src/manager/dto/phoneNum-dto';
import { AttachmentDto } from 'src/manager/dto/attachment-dto';

@Injectable()
export class UserService {

  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  @InjectRepository(HotelEntity)private hotelRepository: Repository<HotelEntity>,
  @InjectRepository(PhoneNumberEntity)private readonly phoneNumRepo: Repository<PhoneNumberEntity>,
  @InjectRepository(AttachmentEntity) private readonly attachmentRepo: Repository<AttachmentEntity>){}

  async changePassword (request:Request, changePasswordDto:ChangePasswordDto){ 
    //deconstructing variables.
    let {oldPassword, newPassword} = changePasswordDto;

    //comparing old password with user's password.
    const checkOldPass = await bcrypt.compare(oldPassword, request['user'].password)
    
    if(!checkOldPass)
        throw new HttpException('Old password is incorrect.', HttpStatus.UNAUTHORIZED);
    
    //hashing the new password.
    newPassword = await bcrypt.hash(newPassword,10);
    request['user'].password=newPassword;

    //saving the new password to the user.
    const savedUser= await this.userRepository.save(request['user']);

    return {message:"Password Changed successfully.", ...savedUser};
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAllUsers(paginationOptions:PaginationOptions) {

    const results= await this.userRepository.find({
      skip:(paginationOptions.page-1)*paginationOptions.limit,  //we use this formula of (pageNo*postsPerPage) to find how many item's we are going to skip.
      take:paginationOptions.limit
    });

    const totalItems = await this.userRepository.createQueryBuilder().getCount();
    return {totalItems,results};
  }

  async findAllHotels(paginationOptions:PaginationOptions) {

    //getting hotels.
    const results = await this.hotelRepository.find({
      skip:(paginationOptions.page-1)*paginationOptions.limit,  //we use this formula of (pageNo*postsPerPage) to find how many item's we are going to skip.
      take:paginationOptions.limit,
    });

    for (let i = 0; i < results.length; i++) {
      const curHotel = results[i];
      //getting phoneNumbers that are for the current hotel.
      const phoneNumbers : PhoneNUmberDto[] = await this.phoneNumRepo.createQueryBuilder("phoneNum").where('phoneNum.hotel_id = :hotelId',{hotelId:curHotel.id}).getMany();
      //getting attachments that are for the current hotel.
      const attachments : AttachmentDto[] = await this.attachmentRepo.createQueryBuilder("attach").where('attach.hotel_id = :hotelId',{hotelId:curHotel.id}).getMany();


      //attaching new objects to the hotel.
      curHotel['phoneNumbers'] =phoneNumbers;
      curHotel['attachments'] = attachments;
    }

    const totalItems = await this.hotelRepository.createQueryBuilder().getCount();
    return {totalItems,results};
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
