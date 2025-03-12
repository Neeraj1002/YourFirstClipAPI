// 3rd party lib
import {hashSync,compareSync} from 'bcrypt'
import jwt from 'jsonwebtoken';


//local import
import prisma  from "../DB/db.config.js";
import { JWT_SECRET } from '../secrets.js';
import { BadRequestsException } from '../exception/bad-request.js';
import {ErrorCodes} from '../common/constant-data.js'
// import { UnprocessableEntity } from '../exception/validation.js';
import { SignUpSchema } from '../schema/user.js';
import { NotFoundException } from '../exception/not-found.js';

// Sign up function
export const signup = async (req,res,next) => {
   
        SignUpSchema.parse(req.body)
        const {email, password, name, phone, role} = req.body;

        const uniqueEmail = await prisma.user.findUnique({where: {email}})
        const uniquePhoneNumber = await prisma.user.findUnique({where: {phone}})
     
        let errorMessages = [];
        if (uniqueEmail) {
          errorMessages.push('User already exists');
        }
        if (uniquePhoneNumber) {
          errorMessages.push('Phone number already exists');
        }
    
        if (errorMessages.length > 0) {
          throw new BadRequestsException(errorMessages.join(' and '), ErrorCodes.USER_ALREADY_EXIST);
        }
        
        const user = await prisma.user.create({
         data:{
             name,
             email,
             password: hashSync(password, 10),
             phone,
             role
         }
        })
        res.json({
          message: 'User registered successfully'
        });
        

}

export const login = async (req,res) => {
  console.log(req.body)
    const {email, password} = req.body;

    let user = await prisma.user.findUnique({where: {email}})
 
    if(!user) {
     throw new NotFoundException('User not found', ErrorCodes.USER_NOT_FOUND)
    }
 
    if(!compareSync(password, user.password)) {
        throw new BadRequestsException('Incorrect password', ErrorCodes.INCORRECT_PASSWORD)
    }
const token = jwt.sign({
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
}, JWT_SECRET,
{ expiresIn: '10m' })

res.json(token)
 }

 export const authenticateUser = async (req,res) => {
 res.json(req.user)
 }