import express, { Request, Response, NextFunction } from 'express';
import { OrderRepository } from "./repositories/OrderRepository";
import { Order } from './entities/order';

import { DataSource} from 'typeorm';

const app = express();

// const dataSource = new DataSource({})

// dataSource.initialize()
// .then(()=>{console.log("database connected");})
// .catch(err=>{console.log(err);
// })

   



// app.get("/",async (req:Request,res:Response,next:NextFunction)=>{
  
//   const rep =  dataSource.getRepository(Order)
//   const a = await rep.find()
//   res.json(a)
// })


app.listen(3002, () => {
    console.log(`Server is running on port 3002`);
  });