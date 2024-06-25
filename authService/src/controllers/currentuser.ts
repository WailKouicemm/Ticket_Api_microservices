


import { NextFunction, Request, Response } from 'express';
import { JwtManager } from '../services/jwt_generator';
import User from '../models/User';
import CustomError from '../errors/CustomError';


const getCurrentUser =async (req:Request,res:Response , next:NextFunction)=>{


        try {
                if (!req.session || !req.session.jwt) {
                        throw new CustomError('unauthorized',403);
                          
                   }
           
                   const token = req.session.jwt;
                   const decodedtoken = JwtManager.Jwtdecoder(token)

                   console.log(decodedtoken);
                   

                   if (!decodedtoken.email || !decodedtoken.id) {
                           throw new CustomError('uuuuuuunauthorized',403)
                   }
           
                   const existingUser = await User.findOne({
                           email : decodedtoken.email,
                           _id : decodedtoken.id
                   })
           
                   if (!existingUser) {
                           new CustomError('unauthorized',403)
                   }
           
                   res.status(201).json(existingUser)
                
        } catch (error) {
                next(error)
        }
        

}




export = {getCurrentUser};