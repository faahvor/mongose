import User from "../models/userModel.js"
import bcrypt from "bcrypt"

export const createUser = async (req,res)=>{
    try{
        const{userName,password} = req.body
        const user = new User(req.body);

        const existingUser = await User.findOne({userName})
        if (existingUser){
            return res.status(400).json({message:"user already exists" })
        }
        //amount of times salts are generated into the password ,makes it harder to crack
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            status:"success",
            message: "user created successfully",
        })
    }catch(error){
        res.status(400).send(error)
    }
}

export const userLogin = async (req,res)=>{
try{

}catch(error){

}
}