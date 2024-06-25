import express, { NextFunction, Router } from "express";
import { json } from "body-parser";
import CurrentUserRouter from "./routes/currentuser";
import SignInRouter from "./routes/signin";
import SignUpRouter from "./routes/signup";
import SignOutRouter from "./routes/signout";

import errorHandler from "./middlewares/errorHandler";
import CustomError from "./errors/CustomError";
import { Request, Response ,} from 'express';
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import Middlware  from "./middlewares/authentication";

const app = express();
app.set('trust proxy' ,true)

app.use(json())
app.use(cookieSession({
    signed : false,
    secure : true
}))


app.use(CurrentUserRouter)
app.use(SignInRouter)
app.use(SignUpRouter)
app.use(SignOutRouter)




app.all('*', async (req : Request,res : Response , next:NextFunction)=>{
    next(new CustomError("endpoint not found",404) )
})  



app.use(errorHandler)


const start = async ()=>{
    try {
        if (!process.env.MONGO_URI) {
            throw new CustomError("MONGO_URI must be defined",400);
            
        }
        await mongoose.connect(process.env.MONGO_URI)  
        console.log("db connected");
        
    } catch (error) {
        console.log(error);
    }
 
}


app.listen(3000,()=>{
    console.log("auth server listening on port 3000 !!");
})


start()
