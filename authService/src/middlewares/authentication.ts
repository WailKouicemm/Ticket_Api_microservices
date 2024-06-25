
import { NextFunction, Request, Response } from 'express';
import { JwtManager } from '../services/jwt_generator';
import User from '../models/User';
import CustomError from '../errors/CustomError';


interface user{
    id:string,
    email:string
}

declare global {
    namespace Express{
        interface Request{
            user ?: user
        }
    }
}

const authMiddlware =async (req:Request,res:Response , next:NextFunction)=>{



    try {
        if (!req.session) {
                throw new CustomError('unauthorized',403);
                  
           }
   
           const token = req.session.jwt;
           const decodedtoken = JwtManager.Jwtdecoder(token)

           

           if (!decodedtoken.email || !decodedtoken.id) {
                   throw new CustomError('unauthorized',403)
           }
   
           const existingUser = await User.findOne({
                   email : decodedtoken.email,
                   _id : decodedtoken.id
           }) as user

   
           if (!existingUser) {
                   new CustomError('unauthorized',401)
           }
   
           req.user = existingUser ;

           next()
        
} catch (error) {
        next(error)
}


}

export = {authMiddlware}