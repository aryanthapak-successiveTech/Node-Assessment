import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ApiError } from "./ErrorHandler";

const studentSchema=Joi.object({
    name:Joi.string().min(8).required(),
    age:Joi.number().required(),
    grade:Joi.string().required(),
    email:Joi.string().email().required()
})

export const validateStudent=(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {error}=studentSchema.validate(req.body);
        if(error){
            throw new ApiError(400,error.message)
        }
        next();
    }
    catch(err){
        next(err);
    }
    
}