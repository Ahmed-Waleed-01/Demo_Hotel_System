import { IsDate, IsEmail, IsEnum, IsNumber, IsOptional, IsString, Length} from "class-validator";
import { BaseUserDto } from "./base.dto";


export class UserDto extends BaseUserDto {

    @IsNumber()
    id: number;

    @IsDate()
    created_at: Date;
}
