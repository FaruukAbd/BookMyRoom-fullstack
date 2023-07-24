import mongoose from "mongoose";

const BookingSchema =new mongoose.Schema({
    userId: {
        type: String,
        required: true,
      },
    
    city: {
        type: String,
      },
    checkIn:{
        type:Date,
        required:false
      },
    checkOut:{
        type:Date,
        required:false
      },
    adult:{
        type:String,
        required:false
      },
      child:{
        type:String,
        required:false
      },
    Hotel:{
        type:String,
        required:false
      },
    RoomNoId:[{
     roomId:String,
     roomNum:Number
       
    }],

    Price: {
        type: Number,
        required: true,
        default:0
      },
    PaymentDone: {
        type: Boolean,
        default: false,
      },
} ,{timestamps:true});

export default mongoose.model("Booking",BookingSchema)