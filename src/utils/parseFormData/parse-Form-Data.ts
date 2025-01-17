import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export const parseFormDataBody = async(requestBody)=>{

    try {
        //looping on every key in requestBody to parse it.
        Object.keys(requestBody).forEach((key)=>{
            requestBody[key] = JSON.parse(requestBody[key]);})
    }catch{}
    

    
}