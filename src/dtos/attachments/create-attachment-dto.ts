import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { AttachmentType } from 'src/db/entities/attachment.entity';
import { BaseDto } from '../Shared/base-dto';

export class CreateAttachmentDto extends BaseDto {

  @IsEnum(AttachmentType)
  type: AttachmentType;

  @IsString()
  @IsUrl()
  attachment_url: string;
}
