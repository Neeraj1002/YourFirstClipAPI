
//3rd party import
import jwt from 'jsonwebtoken';

//Local imports
import { ErrorCodes } from "../common/constant-data.js"
import prisma from "../DB/db.config.js"
import {UnauthorizedException} from "../exception/unauthorized.js"
import { JWT_SECRET } from "../secrets.js"


export const AuthMiddleware = async(req,res,next) => {
//1. extract token from the header
const token = req.headers.authorization


//2. If token is not present, throw an error of unauthorized
if(!token){
    next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED))
}
try{
    //3. If the token is present, verify that token and extract the payload
const payload = jwt.verify(token, JWT_SECRET)
//4. To get the user from the payload
const user = await prisma.user.findFirst({where: {id: payload.userId}})
if(!user){
    next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED))
}

//5. To attach the user to the current request object
req.user = user
next()
}
catch(error){
    next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED))
}
}

