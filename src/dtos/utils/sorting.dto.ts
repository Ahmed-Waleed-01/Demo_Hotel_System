import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { OrderOptions } from "src/enums/sort-options-enum";
import { SortByOptions } from "src/enums/sortBy-options-enum";



export class SortingOptions {
    
    //ascending or descending order.
    @Transform(({value}) => value.toUpperCase())
    @IsEnum(OrderOptions)
    @IsOptional()
    order: OrderOptions = OrderOptions.asc;
    
    //*******there could be a problem if the user enters an attribute that does not exist.********/
    //sort by which attribute.
    @IsEnum(SortByOptions)
    @IsOptional()
    sortBy: string = SortByOptions.ID;
}


