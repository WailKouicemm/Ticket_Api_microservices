const jwt = require("jsonwebtoken")
const secret = process.env.JWT_KEY;



export class JwtManager {
    static  JwtToken = (id :string , email : string)=>{
        return jwt.sign({id , email},secret)
    }

    static Jwtdecoder = (token:string)=>{
        return jwt.verify(token , secret)
    }
    
}





