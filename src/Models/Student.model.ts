import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"A student must have a name"]
    },
    age:{
        type:Number,
        required:[true,"A student must have an age"]
    },
    grade:{
        type:String,
        required:[true,"A student must have a grade"]
    },
    email:{
        type:String,
        required:[true,"A student must have an email"],
        unique:[true,"Student email should be unique"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const studentModel=mongoose.model("Student",studentSchema);

export default studentModel;

