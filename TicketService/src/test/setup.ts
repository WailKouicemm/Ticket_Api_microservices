import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../app_test';
import mongoose from 'mongoose';

// let mongo: any;

// beforeAll(async () => {

//     mongo = await MongoMemoryServer.create();

//   const mongoUri = mongo.getUri();
//   console.log("/////////////////////////////////////////////////////////");
//   console.log(mongoUri);
  

//   await mongoose.connect(mongoUri); 
// });

// afterAll(async () => {
//   await mongoose.disconnect();
//  // await mongo.stop();
// });








declare global {
    namespace NodeJS {
        interface Global {
            signin: () => string[];
        }
    }
}


const signin = () => {
    const payload = {
        id: '1230',
        email: 'test@test.com'
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!);

    const session = { jwt: token };

    const jsonSession = JSON.stringify(session);

    const base64 = Buffer.from(jsonSession).toString('base64');

    return [`session=${base64}`];
};


export {signin}