import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { AttachmentType } from 'src/enums/attachments-enum';

export class CreateAttachmentDto {

  @IsEnum(AttachmentType)
  type: AttachmentType;

  @IsString()
  @IsUrl()
  attachment_url: string;
}

// form data