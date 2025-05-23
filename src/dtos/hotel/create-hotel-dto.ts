import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { CreatePhoneNumberDto } from '../phoneNumber/create-phoneNum-dto';
import { Type } from 'class-transformer';
import { CreateAttachmentDto } from '../attachments/create-attachment-dto';
import { BaseDto } from '../Shared/base-dto';
import { CreateAmenityDto } from '../amenity/create-amenity';

export class CreateHotelDto extends BaseDto {
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

  @ValidateNested({each:true})
  @Type(() => CreateAmenityDto)
  @IsOptional()
  amenities: CreateAmenityDto[];

  // Validate the nested object
  @ValidateNested({each:true})
  // Transform to AddressDto class instance
  @Type(() => CreatePhoneNumberDto)
  phoneNumbers : CreatePhoneNumberDto[]; // notice we need to insert any number of phone numbers in an array even if it's one.

  @ValidateNested({each:true})
  @Type(() => CreateAttachmentDto)
  @IsOptional()
  attachments : CreateAttachmentDto[];

}
