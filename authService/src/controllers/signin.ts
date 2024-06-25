
import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import CustomError from '../errors/CustomError';
import { JwtManager } from '../services/jwt_generator';




const signin =async (req:Request,res:Response,next:NextFunction)=>{

    const {email,password} = req.body
    try {
        const existingUser = await User.findOne({email , password})
        if (!existingUser) {
            throw new CustomError('Invalid Credentials',401)
        }

        const token = JwtManager.JwtToken(existingUser.id,existingUser.email)

        req.session = {
            jwt : token
    }
    

    res.status(200).json(existingUser)
    } catch (error) {
        next(error)
    }
}




export = {signin};