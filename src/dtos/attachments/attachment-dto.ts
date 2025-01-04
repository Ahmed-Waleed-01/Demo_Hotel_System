import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, Length } from 'class-validator';
import { HotelEntity } from 'src/db/entities/hotel.entity';
import { CreateAttachmentDto } from './create-attachment-dto';

export class AttachmentDto extends CreateAttachmentDto {
    @IsNumber()
    id: number;

  @IsNumber()
  @IsPositive()
  hotel: HotelEntity;
  
  
}
