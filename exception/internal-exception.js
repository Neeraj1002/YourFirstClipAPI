import {HttpException} from './root.js'

export class InternalException extends HttpException {
    constructor(message,error,errorCode){
        super(message, errorCode, 500, error)

    }

}