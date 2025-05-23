import { IsEnum, IsPositive, IsString } from 'class-validator';
import { BaseDto } from '../Shared/base-dto';
import { PhoneNumType } from 'src/enums/phoneNum-enum';

export class CreatePhoneNumberDto extends BaseDto {
  
  @IsEnum(PhoneNumType)
  type: PhoneNumType;

  @IsString()
  phone_number: string;

}
