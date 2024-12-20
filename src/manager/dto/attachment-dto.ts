import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, Length } from 'class-validator';
import { AttachmentType } from 'src/db/entities/attachment.entity';
import { CreateAttachmentDto } from './create-attachment-dto';
import { HotelEntity } from 'src/db/entities/hotel.entity';

export class AttachmentDto extends CreateAttachmentDto {
    @IsNumber()
    id: number;

  @IsNumber()
  @IsPositive()
  hotel: HotelEntity;
  
  
}
