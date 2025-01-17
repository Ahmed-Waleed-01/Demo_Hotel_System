import { HotelFilterOptions } from './../../dtos/filters/hotelFilters-dto';
import { UserFilterOptions } from './../../dtos/filters/userFilters-dto';
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
import { SortingOptions } from 'src/dtos/utils/sorting.dto';

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

  async findAllUsers(paginationOptions:PaginationOptions, sortingOptions:SortingOptions, userFilterOptions:UserFilterOptions) {

    //this new way returns paginatied results using createQueryBuilder Method and count of items in that table.
    const query = this.userRepository.createQueryBuilder("users")
    .take(paginationOptions.size)
    .skip((paginationOptions.page-1)*paginationOptions.size)
    .orderBy(sortingOptions.sortBy,sortingOptions.order);
    
    //setting up filter logic but it should be encapsulated else where.
    if(userFilterOptions.email)
      query.andWhere('users.email ILIKE :email', { email: `%${userFilterOptions.email}%` }); // ILIKE for case-insensitive

    if(userFilterOptions.first_name)
      query.andWhere('users.first_name ILIKE :first_name', { first_name: `%${userFilterOptions.first_name}%` }); // ILIKE for case-insensitive

    if(userFilterOptions.last_name)
      query.andWhere('users.last_name ILIKE :last_name', { last_name: `%${userFilterOptions.last_name}%` });

    if(userFilterOptions.id)
      query.andWhere('users.id = :id', { id: userFilterOptions.id });

    if(userFilterOptions.role)
      query.andWhere('users.role = :role', { role: userFilterOptions.role });
    
    //getting final results and saving them.
    const [users,totalCount] = await query.getManyAndCount();

    return {totalCount, users};
  }

  async findAllHotels(paginationOptions:PaginationOptions, sortingOptions:SortingOptions, hotelFilterOptions:HotelFilterOptions) {

    //getting hotels and applying pagination and sorting.
    const query = this.hotelRepository.createQueryBuilder("hotels")
    .take(paginationOptions.size)
    .skip((paginationOptions.page-1)*paginationOptions.size) //we use this formula of (pageNo*postsPerPage) to find how many item's we are going to skip.
    .orderBy(sortingOptions.sortBy,sortingOptions.order)
    
    //applying filter logic.
    if(hotelFilterOptions.id)
      query.andWhere('hotels.id = :id', {id: hotelFilterOptions.id});

    if(hotelFilterOptions.email)
      query.andWhere('hotels.email ILIKE :email', {email: `%${hotelFilterOptions.email}%`}); // ILIKE for case-insensitive

    if(hotelFilterOptions.name)
      query.andWhere('hotels.name ILIKE :name', {name: `%${hotelFilterOptions.name}%`});

    if(hotelFilterOptions.status)
      query.andWhere('hotels.status = :status', {status: hotelFilterOptions.status});

    const [hotels,totalCount] = await query.getManyAndCount();

    return {totalCount,hotels};
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
