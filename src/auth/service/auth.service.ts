import { UserDto } from '../../dtos/user/user.dto';
import { ChangePasswordDto } from '../../dtos/auth/changePassword.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from 'src/db/entities/user.entity';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../../dtos/auth/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtLoginPayload } from '../../dtos/auth/jwtPayload.dto';


@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository :Repository<UserEntity>,
    private readonly jwtService:JwtService)
    {}


    async getUsers():Promise<UserEntity[]>{
        return await this.userRepository.find();
    }

    
    async register(createUserData: CreateUserDto):Promise<UserEntity>{

        //lets make all of the email lowercase
        createUserData.email = createUserData.email.toLowerCase();

        //check if user email was already used.
        const checkUserEmail = await this.userRepository.findOne({where:{email:createUserData.email}});
        if(checkUserEmail)
            throw new HttpException("user email is already registered with.", HttpStatus.CONFLICT);
        
        //hash the password then add the user.
        createUserData.password = await bcrypt.hash(createUserData.password,10);
        
        const newUser = this.userRepository.create(createUserData);
        const userSave = await this.userRepository.save(newUser);
        return userSave;
    }
    
    async login(loginData: LoginDto){

        //lets make all of the email lowercase.
        loginData.email = loginData.email.toLowerCase();

        //check if user email is correct.
        const checkUserEmail = await this.userRepository.findOne({where:{email:loginData.email}});
        if(!checkUserEmail)
            throw new HttpException("Incorrect email or password.", HttpStatus.NOT_FOUND);
        
        //checking if passowrd is correct.
        const correctPass = bcrypt.compareSync(loginData.password,checkUserEmail.password);
        if(!correctPass)
            throw new HttpException("Incorrect email or password.", HttpStatus.NOT_FOUND);

        //creating a payload that will be encrypted into the token.
        const payLoad:JwtLoginPayload = {id:checkUserEmail.id,email:checkUserEmail.email};
        
        const token = this.jwtService.sign(payLoad);

        return {"User":checkUserEmail,token};
    }

}
