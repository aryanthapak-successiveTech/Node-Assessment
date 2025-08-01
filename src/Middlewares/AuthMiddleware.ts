import { NextFunction, Request, Response } from "express";
import { ApiError } from "./ErrorHandler";
import jwt from "jsonwebtoken"

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const token=req.headers.authorization?.split(" ")[1] as string;
    if(!token){
        next(new ApiError(404,"Token not found"));
    }

    const secret=process.env.JWT_SECRET as string;
    const decoded=jwt.verify(token,secret);
    if(!decoded){
        next(new ApiError(401,"Unauthorized"));
    }

    next();
};
