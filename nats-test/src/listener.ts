import nats , {Message, Stan, SubscriptionOptions}from "node-nats-streaming";
import { randomBytes } from "crypto";
import { Listener, Subjects, TicketCreatedEvent, TicketUpdatedEvent } from "@wailkouicem/common";



export class TicketCreatedListner extends Listener<TicketUpdatedEvent>{
    subject : Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = "payment-service";

    
    onMessage(msg: Message, data: TicketCreatedEvent['data']): void {
        console.log(data);
        msg.ack()
    }

}

    
    

const stan = nats.connect('ticketing',randomBytes(4).toString("hex"),{
    url : "http://localhost:4222"
})



stan.on("connect" , ()=>{
    console.log("connected to nats srerver");
    
 new TicketCreatedListner(stan).listen()
})


stan.on("close",()=>{
    console.log("nats publisher disconnected");
    process.exit()
    
})

process.on("SIGINT",()=>stan.close())


