import { IsDateString, IsNumber, IsOptional, IsPositive } from "class-validator";


export abstract class BaseDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    id?: number;

    @IsDateString()
    @IsOptional()
    created_at?: Date;

}