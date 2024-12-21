import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { AttachmentType } from 'src/db/entities/attachment.entity';

export class CreateAttachmentDto {

  @IsEnum(AttachmentType)
  type: AttachmentType;

  @IsString()
  @IsUrl()
  attachment_url: string;
}
