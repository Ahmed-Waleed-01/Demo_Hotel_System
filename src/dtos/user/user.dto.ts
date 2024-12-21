import { IsDate, IsEmail, IsEnum, IsNumber, IsOptional, IsString, Length} from "class-validator";
import { CreateUserDto } from "./create-user.dto";


export class UserDto extends CreateUserDto {
}
