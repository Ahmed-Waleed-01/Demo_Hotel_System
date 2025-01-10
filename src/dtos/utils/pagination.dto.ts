import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";



export class PaginationOptions {

    /*the amount of items to be requested per page*/
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsPositive()
    @IsOptional()
    size: number = 5;
    
    //the page that is requested
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsPositive()
    @IsOptional()
    page: number = 1;
}


