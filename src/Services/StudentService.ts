import { IQueryObj, IStudent } from "../Interfaces/Student.Interface";
import { ApiError } from "../Middlewares/ErrorHandler";
import Student from "../Models/Student.model";
export const findStudents = async (queryObj: IQueryObj) => {
  const page = Number(queryObj.page) || 1;
  const limit = Number(queryObj.limit) || 100;
  const sortingOrder = queryObj.order === "asc" ? 1 : -1;
  const sortBy = queryObj.sortBy as string;
  const skipData = (page - 1) * limit;
  const query = Student.aggregate([
    {
      $skip: skipData,
    },
    {
      $limit: limit,
    },
    {
      $sort: {
        [sortBy]: sortingOrder,
      },
    },
  ]);

  const studentData = await query;

  return studentData;
};

export const addStudent = async (StudentData: IStudent) => {
  const addedStudent = await Student.create(StudentData);
  return addedStudent;
};

export const findStudent = async (studentId: string) => {
  const student = await Student.findById(studentId);
  if (!student) {
    throw new ApiError(404, "Student not found");
  }
  return student;
};

export const updateStudent = async (
  studentId: string,
  studentData: IStudent
) => {
  const updatedStudent = await Student.findOneAndUpdate(
    { _id: studentId },
    studentData,
    {
      new: true,
      runValidators: true,
    }
  );
  return updatedStudent;
};

export const deleteStudent = async (studentId: string) => {
  await Student.findByIdAndDelete(studentId);
  return true;
};

export const betweenAgeData = async (minAge: number, maxAge: number) => {

  const studentData = await Student.find({
    age: {
      $lte: maxAge,
      $gte: minAge,
    },
  });

  return studentData;
};

export const ageStats = async () => {
  const studentDataStats = await Student.aggregate([
    {
      $group: {
        _id: null,
        averageAge: { $avg: "$age" },
        maxAge: { $max: "$age" },
        minAge: { $min: "$age" },
      },
    },
    {
      $project: {
        _id: 0,
        averageAge: 1,
        maxAge: 1,
        minAge: 1,
      },
    },
  ]);

  return studentDataStats;
};
