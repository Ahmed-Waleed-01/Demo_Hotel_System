import { ChangePasswordDto } from '../../dtos/auth/changePassword.dto';
import { Body, ClassSerializerInterceptor, Controller, Get, Post, Put, Req, Res, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { LoginDto } from '../../dtos/auth/login.dto';
import { UserAuthGuard } from '../guards/userAuth.guard';
import { SetRoles } from '../decorator/set-role.decorator';
import { RolesGuard } from '../guards/rolesAuth.guard';
import { CreateManagerDto } from 'src/dtos/manager/create-manager.dto';
import { CreateAdminDto } from 'src/dtos/admin/create-admin.dto';
import { UserRole } from 'src/enums/user-enum';

@Controller('')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

    constructor(private readonly authService:AuthService){}

    //decorators are executed from bottom to up.
    @Get()
    @UseGuards(UserAuthGuard,RolesGuard)
    @SetRoles(UserRole.USER,UserRole.ADMIN)
    showUsers(){
        return this.authService.getUsers();
    }

    @Post('register')
    @UsePipes(new ValidationPipe({whitelist:true /*removes any additional properity in the object. */}))
    register(@Body(new ValidationPipe()) createUserData:CreateUserDto){
        return this.authService.register(createUserData);
    }


    @Post('manager/register')
    createManager(@Body() createManagerDto: CreateManagerDto) {
    //setting the account role to manager.
    createManagerDto.role=UserRole.HOTELMANAGER;
    //using the authService register function to create an account of role register.
    return this.authService.register(createManagerDto);
    }

    @Post('admin/register')
    createAdmin(@Body() createAdminDto: CreateAdminDto) {
    //setting the account role to admin.
    createAdminDto.role=UserRole.ADMIN;
    //using the authService register function to create an account of role register.
    return this.authService.register(createAdminDto);
    }

    @Get('login')
    @UsePipes(new ValidationPipe({whitelist:true }))
    login(@Body(new ValidationPipe()) loginData:LoginDto){
      
        return this.authService.login(loginData);
    }

}
