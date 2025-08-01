import express from "express";
import {getStudent,getStudents,insertUser,updatedStudentDetails,deleteStudentDetails, getAgeBasedStudent} from "../Controllers/StudentController"
import { verifyToken } from "../Middlewares/AuthMiddleware";
const router=express.Router();

router.route("/").get(verifyToken,getStudents).post(verifyToken,insertUser);
router.route("/:id").get(verifyToken,getStudent).put(verifyToken,updatedStudentDetails).delete(verifyToken,deleteStudentDetails);
router.route("/age").get(verifyToken,getAgeBasedStudent);

export default router;