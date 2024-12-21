import { IsEmail, IsEnum, IsOptional, IsString, Length} from "class-validator";
import { UserRole } from "src/db/entities/user.entity";
import { BaseUserDto } from "./base.dto";


export class CreateUserDto extends BaseUserDto{
}
