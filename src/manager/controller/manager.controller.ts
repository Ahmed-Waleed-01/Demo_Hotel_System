import { PhoneNUmberDto } from './../../dtos/phoneNumber/phoneNum-dto';
import { AuthService } from './../../auth/service/auth.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, ValidationPipe, UsePipes, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { ManagerService } from '../service/manager.service';
import { CreateManagerDto } from '../../dtos/manager/create-manager.dto';
import { UpdateManagerDto } from '../../dtos/manager/update-manager.dto';
import { CreateHotelDto } from '../../dtos/hotel/create-hotel-dto';
import { SetRoles } from 'src/auth/decorator/set-role.decorator';
import { UserAuthGuard } from 'src/auth/guards/userAuth.guard';
import { RolesGuard } from 'src/auth/guards/rolesAuth.guard';
import { UserRole } from 'src/enums/user-enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { parseFormDataBody } from 'src/utils/parseFormData/parse-Form-Data';

@Controller('manager')
@SetRoles(UserRole.HOTELMANAGER)
@UseGuards(UserAuthGuard, RolesGuard)
export class ManagerController {
  constructor(private readonly managerService: ManagerService,
  private readonly authService: AuthService) {}

  @Post('addHotel')
  @UsePipes(new ValidationPipe({whitelist:true}))
  addHotel(@Req() req:Request,@Body() createHotelDto:CreateHotelDto) {

    return this.managerService.addHotel(req,createHotelDto);
  }

  @Post('addImage')
  @UsePipes(new ValidationPipe({whitelist:true}))
  @UseInterceptors(FileInterceptor('image')) //the name of the html field that we get from input.
  uploadImage(@Req() req:Request,
  //validating uploaded file size and file type.
@UploadedFile(new ParseFilePipeBuilder().addFileTypeValidator({fileType:`jpg|jpeg|png|gif|bmp`}).build({fileIsRequired:true, errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})) image:Express.Multer.File) {

    return this.managerService.addImgToHotel(req, image);
  }

}
