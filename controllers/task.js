import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";


export const newTask = async(req, res,next)=>{
try{
    const{title,description} =req.body;

   
    
    await Task.create({
        title,
        description,
        user:req.user,
    });

    

    res.status(201).json({
        success:true,
        message:"Task added Successfully",
    });
}catch(error){
    next(error);
}
   
};

export const getMyTask = async (req, res, next) => {
    
    try{
        const userid = req.user._id;  
  
      const tasks = await Task.find({ user: userid });
  
      res.status(200).json({
        success: true,
        tasks,
      });

    }
    catch(error){
        next(error);
        
    }
      

};

export const updateTask = async (req, res, next) => {
    try{
        const id = req.params.id; 
       

        const task = await Task.findById(id);
    
        if(!task){
            return next(new ErrorHandler("Task not found",404));   //return next(new Error("Task not found"));
        }
    
        task.isCompleted = !task.isCompleted;
    
        await task.save();
    
        res.status(200).json({
          success: true,
          message:"Task Updated",
          
        });

    }catch(error){
        next(error);
        
    }

  

};

export const deleteTask = async (req, res, next) => {

    try{
        const id = req.params.id; 

    const task = await Task.findById(id);

    if(!task){
        return next(new ErrorHandler("Task not found",404));  // (ref error.js) ErrorHandler is the extension of Error as in error we were only able to give the error message and not he status code as it was like this return next(new Error("Task not found")); but now ErrorHandler provides both return next(new ErrorHandler("Task not found",404)); and if we do this return next(new ErrorHandler()); not giving message and error also then ther eis some default set and in postman it will give { "success":false, "message": Internal Sver error} and error will be 500
    }

    

    await task.deleteOne();
   

    res.status(200).json({
      success: true,
      message : "Task Deleted",
    
    });

    }catch(error){
        next(error);
        
    }
    
    

};

