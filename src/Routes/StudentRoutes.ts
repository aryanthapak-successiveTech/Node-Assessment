import express from "express";
import {getStudent,getStudents,insertUser,updatedStudentDetails,deleteStudentDetails, getAgeBasedStudent} from "../Controllers/StudentController"
import { verifyToken } from "../Middlewares/AuthMiddleware";
import { validateStudent } from "../Middlewares/ValidationMiddlewares";
const router=express.Router();

router.route("/").get(verifyToken,getStudents).post(verifyToken,validateStudent,insertUser);
router.route("/:id").get(verifyToken,getStudent).put(verifyToken,updatedStudentDetails).delete(verifyToken,deleteStudentDetails);
router.route("/age").get(verifyToken,getAgeBasedStudent);

export default router;