import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, ValidationPipe } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserAuthGuard } from 'src/auth/guards/userAuth.guard';
import { ChangePasswordDto } from 'src/auth/dto/changePassword.dto';
import { SetRoles } from 'src/auth/decorator/set-role.decorator';
import { UserRole } from 'src/db/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/rolesAuth.guard';

@Controller('profile')
@UseGuards(UserAuthGuard,RolesGuard) //both guards will be used on all of this controller routes.
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Put('changePassword')
  @SetRoles(UserRole.USER,UserRole.ADMIN,UserRole.HOTELMANAGER)
  changePassword(@Req() request:Request,@Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto){
        return this.userService.changePassword(request,changePasswordDto);
  }
}
