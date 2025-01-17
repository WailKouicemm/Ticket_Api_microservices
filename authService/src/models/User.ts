import mongoose from "mongoose";


// interface Useratt {
//     email : string ,
//     password : string
// }

// interface UserModel extends mongoose.Model<UserDoc> {
//     build(attr:Useratt):UserDoc,
// }


// interface UserDoc extends mongoose.Document{
//     email :string,
//     password : string,
// }

const userSchema = new mongoose.Schema({
    email : { 
        type : String ,
        required : true
    },
    password : {
        type : String,
        required : true
    }

},
{
    toJSON : {
        transform(doc, ret){
            ret.id = ret._id
            delete ret._id
            delete ret.password
            delete ret.__v
        }
    }
}

)

// userSchema.statics.build = (att : Useratt)=>{
//     return new User(att)
// }


const User = mongoose.model('User',userSchema)







export =User