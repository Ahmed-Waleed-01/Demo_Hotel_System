import { IsDefined, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { CreatePhoneNumberDto } from '../phoneNumber/create-phoneNum-dto';
import { Transform, Type } from 'class-transformer';
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

  @IsDefined() //makes sure that entered data is not null or undefined.
  @ValidateNested({each:true}) // Validate the nested object
  @Type(() => CreateAmenityDto) // Transform to AddressDto class instance
  amenities: CreateAmenityDto[];

  @IsDefined()
  @ValidateNested({each:true})
  @Type(() => CreatePhoneNumberDto)
  phoneNumbers : CreatePhoneNumberDto[]; // notice we need to insert any number of phone numbers in an array even if it's one.

}
