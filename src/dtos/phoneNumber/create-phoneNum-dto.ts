import { IsEnum, IsPositive, IsString } from 'class-validator';
import { PhoneNumType } from 'src/db/entities/phoneNumber.entity';
import { BaseDto } from '../Shared/base-dto';

export class CreatePhoneNumberDto extends BaseDto {
  
  @IsEnum(PhoneNumType)
  type: PhoneNumType;

  @IsString()
  @IsPositive()
  phone_number: string;

}
