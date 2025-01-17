import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { CreatePhoneNumberDto } from '../phoneNumber/create-phoneNum-dto';
import { Type } from 'class-transformer';
import { CreateAttachmentDto } from '../attachments/create-attachment-dto';
import { CreateAmenityDto } from '../amenity/create-amenity';
import { CreateHotelDto } from './create-hotel-dto';

export class HotelDto extends CreateHotelDto {
  
  @ValidateNested({each:true})
  @Type(() => CreateAttachmentDto)
  @IsOptional()
  attachments : CreateAttachmentDto[];

}
