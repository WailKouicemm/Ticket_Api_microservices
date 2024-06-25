import express, { NextFunction, Router } from "express";
import { json } from "body-parser";
import { natsWrapper } from "./nats-wrapper";


import {CustomError ,ErrorHandler} from "@wailkouicem/common";
import { Request, Response ,} from 'express';
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import ticketRouter from "./routes/ticket";

const app = express();
app.set('trust proxy' ,true)



app.use(json())
app.use(cookieSession({
    signed : false,
    secure : true
}))



app.use(ticketRouter)


app.all('*', async (req : Request,res : Response , next:NextFunction)=>{
    next(new CustomError("endpoint not found",404) )
})  



app.use(ErrorHandler)


const start = async ()=>{
    try {
        if (!process.env.MONGO_URI) {
            throw new CustomError("MONGO_URI must be defined",400);
            
        }
        await mongoose.connect(process.env.MONGO_URI)  
        console.log("db connected");


        await natsWrapper.connect('ticketing','hahaha',"http://nats-cip-srv:4222")
         
        natsWrapper.client.on("close",()=>{
            console.log("nats publisher disconnected");
            process.exit()
            
        })
        
        process.on("SIGINT",()=>natsWrapper.client.close())

        
    } catch (error) {
        console.log(error);
    }
 
}


app.listen(3001,()=>{
    console.log("auth server listening on port 3001 !!");
})


start()


