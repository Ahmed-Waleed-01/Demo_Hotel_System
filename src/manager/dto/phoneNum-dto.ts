import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, Length } from 'class-validator';
import { AttachmentType } from 'src/db/entities/attachment.entity';
import { CreatePhoneNumberDto } from './create-phoneNum-dto';
import { HotelEntity } from 'src/db/entities/hotel.entity';

export class PhoneNUmberDto extends CreatePhoneNumberDto{
  @IsNumber()
  id: number;

  @IsNumber()
  @IsPositive()
  hotel: HotelEntity;
}
