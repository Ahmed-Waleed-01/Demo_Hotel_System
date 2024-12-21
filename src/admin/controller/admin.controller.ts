import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { UserRole } from 'src/db/entities/user.entity';
import { SetRoles } from 'src/auth/decorator/set-role.decorator';
import { UserAuthGuard } from 'src/auth/guards/userAuth.guard';
import { RolesGuard } from 'src/auth/guards/rolesAuth.guard';
import { HotelStatus } from 'src/db/entities/hotel.entity';

@Controller('admin')
@SetRoles(UserRole.ADMIN)
@UseGuards(UserAuthGuard,RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('getPending')
  getPendingHotels() {
    return this.adminService.getPendingHotels();
  }

  @Put('acceptHotel/:id')
  acceptHotel(@Param('id', ParseIntPipe) id: number) {
    //passing the new status as a paramater
    const newStatus = HotelStatus.ACCEPTED;
    return this.adminService.changeHotelStatus(id,newStatus);
  }

  @Put('rejectHotel/:id')
  rejectHotel(@Param('id', ParseIntPipe) id: number) {
    //passing the new status as a paramater
    const newStatus = HotelStatus.REJECTED;
    return this.adminService.changeHotelStatus(id,newStatus);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
