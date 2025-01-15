import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { UserRole } from "src/enums/user-enum";

export class UserFilterOptions {

    /*searching for user with a specific id.*/
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsPositive()
    @IsOptional()
    id: number;
    
    @IsString()
    @IsOptional()
    first_name: string;

    @IsString()
    @IsOptional()
    last_name: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsEnum(UserRole)
    @IsOptional()
    role: UserRole;
}


