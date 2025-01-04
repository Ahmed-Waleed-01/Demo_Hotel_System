import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, ValidationPipe, UseInterceptors, ClassSerializerInterceptor, UsePipes, Query, Res, Header } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../../dtos/user/create-user.dto';
import { UpdateUserDto } from '../../dtos/user/update-user.dto';
import { UserAuthGuard } from 'src/auth/guards/userAuth.guard';
import { ChangePasswordDto } from 'src/dtos/auth/changePassword.dto';
import { SetRoles } from 'src/auth/decorator/set-role.decorator';
import { RolesGuard } from 'src/auth/guards/rolesAuth.guard';
import { PaginationOptions } from 'src/dtos/utils/pagination.dto';
import { UserRole } from 'src/enums/user-enum';

@Controller('profile')
@UseGuards(UserAuthGuard,RolesGuard) //both guards will be used on all of this controller routes.
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('getUsers')
  // @UsePipes(new ValidationPipe()) we are using global validation pipes in main.ts
  showUsers(@Query() paginationOptions:PaginationOptions) {

    return this.userService.findAllUsers(paginationOptions);
  }

  @Get('getHotels')
  // @UsePipes(new ValidationPipe()) we are using global validation pipes in main.ts
  showHotels(@Query() paginationOptions:PaginationOptions) {

    return this.userService.findAllHotels(paginationOptions);
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
