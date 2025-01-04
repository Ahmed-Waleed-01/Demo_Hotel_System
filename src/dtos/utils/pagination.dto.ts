import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { SortOptions } from "src/enums/sort-options-enum";
import { SortByOptions } from "src/enums/sortBy-options-enum";



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
    
    //ascending or descending order.
    @Transform(({value}) => value.toUpperCase())
    @IsEnum(SortOptions)
    @IsOptional()
    sort: SortOptions = SortOptions.asc;
    
    //*******there could be a problem if the user enters an attribute that does not exist.********/
    //sort by which attribute.
    @IsEnum(SortByOptions)
    @IsOptional()
    sortBy: string = SortByOptions.ID;
}


