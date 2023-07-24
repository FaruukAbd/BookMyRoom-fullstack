import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { errorCreate } from "../utils/error.js";
import mongoose from "mongoose";
export const register=async (req,res,next)=>{
    const salt=bcrypt.genSaltSync(10);
    const hash=bcrypt.hashSync(req.body.password,salt);
    try {
        const newUser =new User({
            ...req.body,
            password:hash
        });
        await newUser.save();
       
        // res.status(200).json(newUser );  
        const token=jwt.sign({id:newUser._id,isadmin:newUser.isadmin},process.env.JWT_SEC_KEY);

          const { password, isadmin, ...otherDetails } = newUser._doc;
        
        res.cookie("access_token",token,{httpOnly:true}).status(200).json({message: "Registration successful",details:{...otherDetails}, isadmin});

    } catch (error) {
       
        next(error);
    }
}

export const login=async (req,res,next)=>{
    
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(errorCreate(404, "User not found!"));
    
        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!isPasswordCorrect)
          return next(errorCreate(400, "Wrong password or username!"));

          const token=jwt.sign({id:user._id,isadmin:user.isadmin},process.env.JWT_SEC_KEY);

          const { password, isadmin, ...otherDetails } = user._doc;
        
        res.cookie("access_token",token,{httpOnly:true}).status(200).json({message: "Login successful",details:{...otherDetails}, isadmin});
    } catch (error) {
        next(error)
    }
} 
