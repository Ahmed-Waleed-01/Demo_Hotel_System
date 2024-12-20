import { ChangePasswordDto } from './../dto/changePassword.dto';
import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { UserAuthGuard } from '../guards/userAuth.guard';

@Controller('')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Get()
    @UseGuards(UserAuthGuard)
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
