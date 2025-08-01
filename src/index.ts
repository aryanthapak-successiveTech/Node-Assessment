import express from "express"
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors"
import { HandleApiError } from "./Middlewares/ErrorHandler";
import studentRouter from "./Routes/StudentRoutes"

config();
const app=express();
app.use(express.json());
app.use(cors());

const PORT=process.env.PORT;
const connectionUrl=process.env.DATABASE_URL as string;
mongoose.connect(connectionUrl).then(()=>{
    console.log("Connected Sucessfully")
}).catch(()=>{
    console.log("Failed to connect")
})

app.use("/students",studentRouter);

app.use(HandleApiError);
app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
})