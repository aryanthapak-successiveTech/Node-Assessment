import { NextFunction, Request, Response } from "express";

export class ApiError extends Error{
    statusCode;
    constructor(statusCode:number,message:string){
        super();
        this.statusCode=statusCode;
    }
}

export const HandleApiError=(error:ApiError,req:Request,res:Response,next:NextFunction)=>{
    const statusCode=error.statusCode||500;
    const message=error.message||"Something went wrong";
    console.log(error.stack);
    return res.status(statusCode).json({
        status:"Failed",
        message:message
    })
}