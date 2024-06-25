import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/CustomError';
import User from '../models/User';
import { JwtManager } from '../services/jwt_generator';



const signup = async(req : Request,res : Response , next:NextFunction)=>{
    
        try {
                const {email,password} = req.body
   
        const existingUser = await User.findOne({email})

        if (existingUser) {
              throw  new CustomError('user exists',403)
        }


       // const password = Password.toHash(password_req)
      
        

        const creatUser = new User({email,password}) 
        const a = await creatUser.save()
        
        const token = JwtManager.JwtToken(a.id , a.email)

        req.session = {
                jwt : token
        }
        

        res.status(201).json(a)  
        

                
        } catch (error) {
                next(error)
        }
          
        
}




export = {signup};