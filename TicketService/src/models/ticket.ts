import mongoose from "mongoose";



const ticketSchema =new mongoose.Schema({
    title : {
        type : String
    },
    price : {
        type : Number
    },
    userId : {
        type : String
    },
    version : {
        type : Number, 
        default : 0
    }
})


const Ticket = mongoose.model('Ticket',ticketSchema)


export = Ticket
