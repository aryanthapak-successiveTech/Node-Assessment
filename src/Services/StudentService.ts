import { IQueryObj, IStudent } from "../Interfaces/Student.Interface";
import { ApiError } from "../Middlewares/ErrorHandler";
import Student from "../Models/Student.model"
export const findStudents=async(queryObj:IQueryObj)=>{
    const page=Number(queryObj.page)||1;
    const limit=Number(queryObj.limit)||100;
    const skipData=(page-1)*limit;
    let query=Student.find().skip(skipData).limit(limit);
    
    const sortBy=queryObj.sortBy;
    const order=queryObj.order==="asc"?"+":"-";
    console.log(queryObj.sortBy);
    if(queryObj.sortBy && queryObj.order){
        query=query.sort(`${order}${sortBy}`)
    }

    const studentData=await query;

    return studentData;
}

export const addStudent=async(StudentData:IStudent)=>{
    const addedStudent=await Student.create(StudentData);
    return addedStudent;   
}

export const findStudent=async(studentId:string)=>{
    const student=await Student.findById(studentId);
    if(!student){
        throw new ApiError(404,"Student not found");
    }
    return student;
}

export const updateStudent=async(studentId:string,studentData:IStudent)=>{
    const updatedStudent=await Student.findOneAndUpdate({_id:studentId},studentData,{
        new:true,
        runValidators:true
    });
    return updatedStudent;
}

export const deleteStudent=async(studentId:string)=>{
    await Student.findByIdAndDelete(studentId);
    return true;
}


export const betweenAgeData=async (minAge:number,maxAge:number)=>{
    const studentData=await Student.find({
        age:{
            $lte:maxAge,$gte:minAge
        }
    })

    return studentData;
}