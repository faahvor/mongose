import{Schema, model} from "mongoose"

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
       unique:true,
       lowercase:true,
       trim:true
    },

    userName:{
        type:String,
        required:true,
        trim:true
    },
    Password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:Date.now
    },
})

const User = model('User',userSchema);
export default User;