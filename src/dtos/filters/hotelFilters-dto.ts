import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { HotelStatus } from "src/enums/hotels-enum";
import { UserRole } from "src/enums/user-enum";

export class HotelFilterOptions {

    /*searching for user with a specific id.*/
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsPositive()
    @IsOptional()
    id: number;
    
    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsEnum(HotelStatus)
    @IsOptional()
    status: HotelStatus;
    
}


