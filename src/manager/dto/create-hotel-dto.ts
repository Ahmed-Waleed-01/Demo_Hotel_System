import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { CreatePhoneNumberDto } from './create-phoneNum-dto';
import { Type } from 'class-transformer';
import { CreateAttachmentDto } from './create-attachment-dto';

export class CreateHotelDto {
  @IsString()
  @Length(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  // @IsNumber()
  // @IsNotEmpty()
  // contactNumber: number;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  amenities: string;

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
