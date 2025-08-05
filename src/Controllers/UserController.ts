import { NextFunction, Request, Response } from "express";
import { createUser, verifyUser } from "../Services/UserService";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDetails = await createUser(req.body);
    return res.status(200).json({
      status: "Success",
      data: userDetails,
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser=async (
  req: Request,
  res: Response,
  next: NextFunction
)=>{
    try{
        const {email,password}=req.body;
        const token=await verifyUser(email,password);
        return res.status(200).json({
            status:"Sucess",
            data:token
        })
    }
    catch(err){
        next(err);
    }
}
