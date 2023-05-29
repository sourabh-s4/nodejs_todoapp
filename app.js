import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path:"./data/config.env",
})
//using middleware
app.use(express.json());       //it should be used before app.use("/users",userRouter); or it will not work
app.use(cookieParser());
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true,                       //if we do not pass cedentials: true then the crdential of the user will not be passed to the front-end
    
}));

//using routes
app.use("/api/v1/users",userRouter);  //// adding /users so that ki baar na karna pade har link ke aage
app.use("/api/v1/task",taskRouter); 


app.get("/",(req,res)=>{
    res.send("Nice working");
});

//using error middleware

app.use(errorMiddleware);