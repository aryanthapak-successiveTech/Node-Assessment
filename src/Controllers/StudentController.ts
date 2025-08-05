import { NextFunction, Request, Response } from "express";
import {
  findStudent,
  findStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  betweenAgeData,
  ageStats,
} from "../Services/StudentService";

export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryObj = req.query;
    const studentsData = await findStudents(queryObj);
    return res.status(200).json({
      status: "Success",
      data: studentsData,
    });
  } catch (err) {
    next(err);
  }
};

export const getStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const studentData = await findStudent(id);
    return res.status(200).json({
      status: "Success",
      data: studentData,
    });
  } catch (err) {
    next(err);
  }
};

export const insertUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentDetails = req.body;
    const studentData = await addStudent(studentDetails);
    return res.status(201).json({
      status: "Success",
      data: studentData,
    });
  } catch (err) {
    next(err);
  }
};

export const updatedStudentDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = req.params.id as string;
    const studentData = await updateStudent(studentId, req.body);
    return res.status(200).json({
      status: "Sucess",
      data: studentData,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteStudentDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = req.params.id as string;
    await deleteStudent(studentId);
    res.status(200).json({
      message:"Success"
    })
  } catch (err) {
    next(err);
  }
};

export const getAgeBasedStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.query);
    const minAge = Number(req.query.minAge);
    const maxAge = Number(req.query.maxAge);
    const studentData = await betweenAgeData(minAge, maxAge);
    return res.status(200).json({
      status: "Success",
      data: studentData,
    });
  } catch (err) {
    next(err);
  }
};

export const getAgeStats= async (
  req: Request,
  res: Response,
  next: NextFunction
)=>{
  try{
    const studentDataStats=await ageStats();
    return res.status(200).json({
      status:"Success",
      data:studentDataStats
    })
  }
  catch(err){
    next(err);
  }
}
