import express from "express";
import userRouter from "./routes/user.js";
import {config } from "dotenv";

export const app = express();

config({
    path:"./data/config.env",
})

app.use(express.json());
app.use("/users",userRouter);  //// adding /users so that ki baar na karna pade har link ke aage

app.get("/",(req,res)=>{
    res.send("Nice working");
});

