import { AuthService } from './../../auth/service/auth.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { ManagerService } from '../service/manager.service';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { UpdateManagerDto } from '../dto/update-manager.dto';
import { UserRole } from 'src/db/entities/user.entity';
import { CreateHotelDto } from '../dto/create-hotel-dto';
import { SetRoles } from 'src/auth/decorator/set-role.decorator';
import { UserAuthGuard } from 'src/auth/guards/userAuth.guard';
import { RolesGuard } from 'src/auth/guards/rolesAuth.guard';

@Controller('manager')
@SetRoles(UserRole.ADMIN)
@UseGuards(UserAuthGuard, RolesGuard)
export class ManagerController {
  constructor(private readonly managerService: ManagerService,
  private readonly authService: AuthService) {}

  @Post('addHotel')
  @UsePipes(new ValidationPipe({whitelist:true}))
  addHotel(@Req() req:Request,@Body() createHotelDto: CreateHotelDto) {

    return this.managerService.addHotel(req,createHotelDto);
  }

}
