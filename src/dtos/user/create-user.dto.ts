import { IsEmail, IsEnum, IsOptional, IsString, Length} from "class-validator";
import { BaseDto } from "../Shared/base-dto";
import { UserRole } from "src/enums/user-enum";


export class CreateUserDto extends BaseDto{
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

    @IsString()
    @IsEnum(UserRole)
    @IsOptional()
    role: UserRole = UserRole.USER;
}
