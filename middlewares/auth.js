import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(404).json({
            success : false,
            message : "Login first",
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);    //usedto decode the id

    req.user = await User.findById(decoded._id);           //if we apply decoded to _id which is there by user by writing  decoded._id we can decode it and can find the id i database and perform furthur function
    
                                                 
    next();
}