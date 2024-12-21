import { UpdateUserDto } from '../../dtos/user/update-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from 'src/dtos/auth/changePassword.dto';
import { PaginationOptions } from 'src/dtos/utils/pagination.dto';
import { HotelEntity } from 'src/db/entities/hotel.entity';
import { PhoneNumberEntity } from 'src/db/entities/phoneNumber.entity';
import { AttachmentEntity } from 'src/db/entities/attachment.entity';

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
      relations:['amenities','phoneNumbers','attachments']
    });

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
