//3rd party imports
import {Router} from 'express'

//Local import
import { signup,login,authenticateUser } from '../controller/auth.js'
import {errorHandler} from '../error-handler.js'
import {AuthMiddleware} from '../middleware/auth.js'

const authRoutes = Router()

authRoutes.post('/signup',errorHandler(signup))
authRoutes.post('/login',errorHandler(login))
authRoutes.get('/authenticateUser',[AuthMiddleware],errorHandler(authenticateUser))

export default authRoutes