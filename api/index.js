import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import hotelsRoute from "./routes/hotels.js";
import bookingRoute from "./routes/bookings.js";
const app=express();
dotenv.config();
       
 
const connect=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("connected to mongodb");
    } catch (error) {
        throw error;
    } 
};  

app.use(cors());
app.use(cookieParser())
app.use(express.json()); 

 

//middlewares 
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);
app.use("/api/bookings",bookingRoute);

app.listen(8800,()=>{
    connect();
    console.log("connected to backend.");
})