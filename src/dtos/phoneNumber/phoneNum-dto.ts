import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, Length } from 'class-validator';
import { CreatePhoneNumberDto } from './create-phoneNum-dto';
import { HotelEntity } from 'src/db/entities/hotel.entity';

export class PhoneNUmberDto extends CreatePhoneNumberDto{
  
  @IsNumber()
  @IsPositive()
  hotel: HotelEntity;
}
