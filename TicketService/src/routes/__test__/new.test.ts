
import request from "supertest";
import { app } from "../../app_test";
import  "../../test/setup";
import { signin } from "../../test/setup";
import Ticket from "../../models/ticket";

it("has a rout handler listening to /api/tickets for post requests ",async()=>{
   const response = await request(app).post("/api/tickets").send({})
   expect(response.status).not.toEqual(404)
});



it("can only be accessed if the user signed in ",async()=>{

    const response = await request(app).post("/api/tickets").send({
        title : "ticket",
        price : 100
    })
    expect(response.status).toEqual(403)
});




it("it returns an error if invalid title is provided ",async()=>{
    const cookie = signin();
    const response = await request(app).post("/api/tickets").send({
        title : 1,
        price : 100
    }).set("Cookie", cookie);
    expect(response.status).toEqual(400)
});




it("it returns an error if invalid price is provided ",async()=>{
    const cookie = signin();
    const response = await request(app).post("/api/tickets").send({
        title : "ticket1",
        price : ""
    }).set("Cookie", cookie);
    expect(response.status).toEqual(400)
});




it("create a ticket with valid inputs ", async () => {

//    let tickets_besor = await Ticket.find({})

//   // expect(tickets_besor.length).toEqual(0)


    const cookie = signin();

    const response = await request(app).post("/api/tickets").set("Cookie", cookie).send({
        title: "ticket",
        price: 100
    });

    expect(response.status).toEqual(201);

    let ticket_after = await Ticket.find({})
    expect(ticket_after.length).toBeGreaterThanOrEqual(1);
 
});
