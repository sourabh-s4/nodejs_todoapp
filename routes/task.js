import express from "express";
import { newTask , getMyTask, updateTask, deleteTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router =express.Router();

router.post("/new", isAuthenticated,newTask);   //isAuthenticated is added so that the tak can be added by only the persons who are logged in and we will get the user for which task should be adeed

router.get("/my", isAuthenticated, getMyTask); 

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated, deleteTask);

export default router;