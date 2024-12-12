import { ChangePasswordDto } from './../dto/changePassword.dto';
import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { UserAuthGuard } from '../guards/userAuth.guard';
import { SetRoles } from '../decorator/set-role.decorator';
import { UserRole } from 'src/db/entities/user.entity';
import { RolesGuard } from '../guards/rolesAuth.guard';

@Controller('')
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

    @Get('login')
    @UsePipes(new ValidationPipe({whitelist:true }))
    login(@Body(new ValidationPipe()) loginData:LoginDto){
        return this.authService.login(loginData);
    }

    
}
