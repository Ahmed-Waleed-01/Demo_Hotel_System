import { IsString } from "class-validator";
import { BaseDto } from "../Shared/base-dto";

export class CreateAmenityDto extends BaseDto{
    @IsString()
    title: string;
}