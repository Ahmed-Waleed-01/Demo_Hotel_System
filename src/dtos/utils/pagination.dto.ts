import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsPositive } from "class-validator";


export class PaginationOptions {

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsPositive()
    @IsOptional()
    /*the amount of items to be requested per page*/
    limit: number = 5;
    
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsPositive()
    @IsOptional()
    //the page that is requested
    page: number = 1;
    
}
