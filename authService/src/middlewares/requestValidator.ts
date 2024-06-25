const {validationResult} = require("express-validator");
import { NextFunction, Request, Response } from 'express';
import { CustomValidation } from 'express-validator/src/context-items';
import CustomRequestValidationError from '../errors/ValidationError';
import CustomError from '../errors/CustomError';




const requestValidator = (req : Request,res: Response,next : NextFunction)=>{


        const result = validationResult(req);
        if (!result.isEmpty()){
                const errorMsg = result.errors[0].msg;
                throw new CustomError(errorMsg,400)
        }

        next()
   
    
    
}


export  =  requestValidator