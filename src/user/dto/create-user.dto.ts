import { IsEmail, IsOptional, IsString, IsStrongPassword, Length} from "class-validator";


export class CreateUserDto {

    @IsString()
    @Length(2,15)
    @IsOptional()
    first_name: string;

    @IsString()
    @Length(2,15)
    @IsOptional()
    last_name: string;

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    @Length(8)
    password:string;

}
