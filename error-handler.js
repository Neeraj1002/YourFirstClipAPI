//Local import
import { ErrorCodes } from "./common/constant-data.js";
import { InternalException } from "./exception/internal-exception.js";
import {HttpException} from "./exception/root.js"

export const errorHandler = (method) => {
    return async(req, res, next) => {
        try {
           await method(req,res,next)
        } catch (error) {
            let exception = new HttpException()
            if(error instanceof HttpException){
                exception = error;
            } else{
                console.log("error", error)
                exception = new InternalException('Oops! Something went wrong', error, ErrorCodes.INTERNAL_EXCEPTION)
            }
            next(exception)
        }
    }
}