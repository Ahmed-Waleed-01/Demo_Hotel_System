import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { CreatePhoneNumberDto } from '../phoneNumber/create-phoneNum-dto';
import { Type } from 'class-transformer';
import { CreateAttachmentDto } from '../attachments/create-attachment-dto';
import { CreateAmenityDto } from '../amenity/create-amenity';
import { CreateHotelDto } from './create-hotel-dto';

export class HotelDto extends CreateHotelDto {
  @IsString()
  @Length(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @ValidateNested()
  @Type(() => CreateAmenityDto)
  @IsOptional()
  amenities: CreateAmenityDto[];

  // Validate the nested object
  @ValidateNested()
  // Transform to AddressDto class instance
  @Type(() => CreatePhoneNumberDto)
  phoneNumbers : CreatePhoneNumberDto[]; // notice we need to insert any number of phone numbers in an array even if it's one.

  @ValidateNested()
  @Type(() => CreateAttachmentDto)
  @IsOptional()
  attachments : CreateAttachmentDto[];

}
