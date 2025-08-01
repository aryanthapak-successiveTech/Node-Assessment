import { config } from "dotenv";
import mongoose from "mongoose";
import { addStudent } from "./Services/StudentService";
config();

const seedData=async()=>{
    const DATABASE_URL=process.env.DATABASE_URL as string;
    await mongoose.connect(DATABASE_URL);

    for(let i=0;i<50;i++){
        await addStudent({
        name: `Student ${i}`,
        age: Math.floor(Math.random()*100),
        grade: "4th year",
        email: `student${i}@gmail.com`,
        })
    }
}
seedData();