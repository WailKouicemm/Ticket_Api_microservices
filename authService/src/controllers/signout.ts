import { NextFunction, Request, Response } from 'express';





const signout = async(req : Request,res : Response , next:NextFunction)=>{

    req.session = null


    
    res.status(200).json({})

}


export = {signout}