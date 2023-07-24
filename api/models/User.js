import mongoose from "mongoose";

const UserSchema =new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
      },
       name: {
        type: String,
        required: false
      
      },
    email: {
        type: String,
        required: true,
        unique:true
      },
      country:{
        type:String,
        required:false
      },
      img:{
        type:String,
        required:false
      },
      city:{
        type:String,
        required:false
      },
      phone:{
        type:String,
        required:true
      },
    password: {
        type: String,
        required: true,
      },
      isadmin: {
        type: Boolean,
        default: false,
      },
} ,{timestamps:true});

export default mongoose.model("User",UserSchema)