import { HotelEntity } from "src/db/entities/hotel.entity";
import { IsNumber, IsPositive, IsString } from "class-validator";
import { CreateAmenityDto } from "./create-amenity";

export class AmenityDto extends CreateAmenityDto{
    @IsNumber()
    id: number;

    @IsNumber()
    @IsPositive()
    hotel: HotelEntity;
}