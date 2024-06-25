import request from "supertest";
import { app } from "../../app_test";
import  "../../test/setup";
import { signin } from "../../test/setup";
import Ticket from "../../models/ticket";
import mongoose from "mongoose";



it("return 404 if the ticket not found",async()=>{
    const cookie = signin();
    const id = new mongoose.Types.ObjectId().toHexString()

    const response = await request(app)
    .get(`/api/tickets/${id}`)
    .set("Cookie", cookie)

    expect(response.status).toEqual(404)
})




it("return 200 if the ticket found",async()=>{
    const title = "test"
    const price = 100
    const cookie = signin();
    const postresponse = await request(app).post("/api/tickets").set("Cookie", cookie).send({
        title,
        price
    });

    const {_id} = postresponse.body

    

    const response = await request(app).get(`/api/tickets/${_id}`).set("Cookie", cookie)

    expect(response.status).toEqual(200) 
    expect(response.body.title).toEqual(title)
    expect(response.body.price).toEqual(price)
})




const createTicket = async ()=>{
    const title = "test"
    const price = 100
    const postresponse = await request(app).post("/api/tickets").set("Cookie", signin()).send({
        title,
        price
    });
}


it("return 200 if  getting all tickets",async()=>{
    
    await createTicket()
    await createTicket()
    const response = await request(app).get(`/api/tickets/`).set("Cookie", signin());

    expect(response.status).toEqual(200) 
    expect(response.body.length).toBeGreaterThanOrEqual(2)
})


