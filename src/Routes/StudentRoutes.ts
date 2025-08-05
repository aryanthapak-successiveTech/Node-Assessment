import express from "express";
import {getStudent,getStudents,insertUser,updatedStudentDetails,deleteStudentDetails, getAgeBasedStudent, getAgeStats} from "../Controllers/StudentController"
import { verifyToken } from "../Middlewares/AuthMiddleware";
import { validateStudent } from "../Middlewares/ValidationMiddlewares";
const router=express.Router();

router.route("/").get(verifyToken,getStudents).post(verifyToken,validateStudent,insertUser);
router.route("/age").get(verifyToken,getAgeBasedStudent);
router.route("/age-stats").get(verifyToken,getAgeStats);
router.route("/:id").get(verifyToken,getStudent).put(verifyToken,validateStudent,updatedStudentDetails).delete(verifyToken,deleteStudentDetails);


export default router;