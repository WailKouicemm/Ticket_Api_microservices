
import { NextFunction, Request, Response ,} from 'express';
import CustomError from '../errors/CustomError';
import CustomRequestValidationError from '../errors/ValidationError';




const errorHandler = (err :any, req : Request, res:Response,next:NextFunction) => {
    console.error(err);
  
    const statusCode = err.status || 500;

    if (err instanceof(CustomError || Error)) {
      res.status(statusCode).json({
        error: {    
          message: err.message || 'Internal Server Error',
        },
      });
    }
    
  };
  
  export = errorHandler;
  