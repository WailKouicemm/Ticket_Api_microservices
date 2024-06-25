import { Router } from "express";
import { body , param} from "express-validator";
import {CustomError, RequestValidator , authMiddlware} from "@wailkouicem/common";
import { Request ,Response ,NextFunction } from "express";
import Ticket from "../models/ticket";
import { TicketCreatedPublisher} from "../events/publishers/ticket-created-publisher";
const router = Router();
import { natsWrapper } from "../nats-wrapper";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";


router.post("/api/tickets",authMiddlware,[
    body("title").isString().withMessage('invalid title'),   
    body("price").isNumeric().withMessage("invalid price")
],RequestValidator , async (req:Request,res:Response,next:NextFunction)=>{

    try {
        const {title,price} = req.body
        const userId = req.user?.id
        const ticket = new Ticket({title , price , userId})  
        const ticketCreated =await ticket.save()  

        await new TicketCreatedPublisher(natsWrapper.client).publish({
            id : ticket.id,
            title : ticket.title!,
            price : ticket.price!,
            userId : ticket.userId!
        })
        res.status(201).json(ticketCreated)
    } catch (error) {
        next(error)
    }



}); 
        




router.get("/api/tickets/:id",authMiddlware ,[
    param('id').isMongoId().withMessage('Invalid ID format'),
    
],RequestValidator,
 async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {id} = req.params
        const ticket = await Ticket.findOne({_id:id })
        
        if (!ticket) {
            throw new CustomError('not found',404)
        }
        res.status(200).json({ticket})
    } catch (error) {
        next(error)
    }



}); 




router.get("/api/tickets/",authMiddlware ,RequestValidator,
 async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const tickets = await Ticket.find({})
        res.status(200).json(tickets)
    } catch (error) {
        next(error)
    }

}); 



router.put("/api/tickets/:id",authMiddlware ,[
    param('id').isMongoId().withMessage('Invalid ID format'),
    body('title').isString().withMessage("invalid title"),
    body("price").isFloat({gt:0}).withMessage("invalid price")
],RequestValidator,
 async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {id} = req.params
        const {title , price} = req.body
        const ticket = await Ticket.findOne({_id:id})
        if (!ticket) {
            throw new CustomError('not found',404)
        }

        if (req.user?.id !== ticket.userId) {
            throw new CustomError("unauthorized",403);  
        }

        ticket.set({
            ...(title && {title}),
            ...(price && {price}),
            version: ticket.version +1
        })
        
        
        await ticket.save()
        new TicketUpdatedPublisher(natsWrapper.client).publish({
            id : ticket.id,
            title : ticket.title!,
            price : ticket.price!,
            userId : ticket.userId!,
        })

        res.status(200).json(ticket)

    } catch (error) {
        next(error)
    }

}); 





export = router; 
