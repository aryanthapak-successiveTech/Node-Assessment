import { IUser } from "../Interfaces/User.Interface";
import { ApiError } from "../Middlewares/ErrorHandler";
import User from "../Models/User.model";
import jwt from "jsonwebtoken"

export const createUser=async(userDetails:IUser)=>{
    const addedUser=await User.create(userDetails);
    const {password,...newUser}=addedUser.toObject();
    return newUser;
}

export const verifyUser=async(email:string,password:string)=>{
    const user=await User.findOne({email});
    if(!user){
        throw new ApiError(404,"Not found");
    }

    const isAuthenticated=await user.authenticateUser(password,user.password);
    if(!isAuthenticated){
        throw new ApiError(401,"Unauthorized");
    }

    const secret=process.env.JWT_SECRET as string;
    const token=jwt.sign({email},secret);
    return token;
}
