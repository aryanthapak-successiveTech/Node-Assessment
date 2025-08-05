import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUserModel } from "../Interfaces/User.Interface";
const userSchema=new mongoose.Schema<IUserModel>({
    email:{
        type:String,
        required:[true,"A student must have an email"]
    },
    password:{
        type:String,
        required:[true,"A student must have an password"]
    },
    username:{
        type:String,
        required:[true,"A student must have an username"]
    },
})

userSchema.pre("save",async function(next){
    this.password=await bcrypt.hash(this.password,12);
})

userSchema.methods.authenticateUser=async function(candidatePassword:string,originalPassword:string){
    const isAuthenticated=await bcrypt.compare(candidatePassword,originalPassword);
    return isAuthenticated
}
const userModel=mongoose.model("User",userSchema);

export default userModel;