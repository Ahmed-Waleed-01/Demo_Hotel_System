import { IsString } from "class-validator";
import { BaseDto } from "../Shared/base-dto";

export class CreateAmenityDto extends BaseDto{
    @IsString()
    title: string;
}


// const User = {
//     id: string,
//     username: string,
//     img_url: string,
// }

// attaches => [mulit] => array of objects => img

// form data "postman"
// 1 - upload img
// 2 - server: upload img to cloud
// 3 - generate url for img 
// 4 - add generated url to user => img_url