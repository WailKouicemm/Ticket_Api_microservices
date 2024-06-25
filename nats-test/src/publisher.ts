import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import {  Publisher, Subjects, TicketCreatedEvent } from "@wailkouicem/common";




export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;

}






const stan = nats.connect('ticketing',randomBytes(4).toString("hex"),{
    url : "http://localhost:4222"
})



stan.on("connect",async ()=>{

    try {
        console.log("connected ")
        await new TicketCreatedPublisher(stan).publish({id:"dsd",price:44,title:"",userId:""})
    } catch (error) {
        console.log(error);
        
    }
    
})
