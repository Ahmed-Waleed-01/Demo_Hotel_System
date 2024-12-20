import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length } from 'class-validator';
import { PhoneNumType } from 'src/db/entities/phoneNumber.entity';

export class CreatePhoneNumberDto {
  
  @IsEnum(PhoneNumType)
  type: PhoneNumType;

  @IsString()
  phone_number: string;

}
