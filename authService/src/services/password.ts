

import { promisify } from "util";
import { randomBytes ,scrypt } from "crypto";

const scryptAsync = promisify(scrypt)

export class Password {

    static async toHash(Password : string){
        const salt = randomBytes(8).toString('hex')
        const buf =( await scryptAsync(Password,salt,16)) as Buffer
        return  `${buf.toString('hex')}.${salt}`;
    }


    static async compare (storedPassword:string ,suppliedPassword:string){

        const [hashedPassword ,salt] = suppliedPassword.split('.')

        const buf =( await scryptAsync(suppliedPassword,salt,16) ) as Buffer


        return buf.toString('hex') === storedPassword
        
    }



    
}