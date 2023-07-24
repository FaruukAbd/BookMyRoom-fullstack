
import Booking from "../models/Booking.js";

export const createBooking=async(req,res,next)=>{
    const newBooking=new Booking(req.body);

    try {
        const savedBooking=await newBooking.save();
        res.status(200).json({message:"your room has been booked successfully",savedBooking});
    } catch (error) {
        next(error)
    }
}
export const deleteBooking = async(req,res,next)=>{
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json("booing has been deleted");
    } catch (error) {
        next(error);
    }
}

export const getBookings=async(req,res,next)=>{
    const userId=req.params.userId;
    try {
        const bookings = await Booking.find({ userId: userId });

        if (bookings.length === 0) {
          return res.status(404).json({ message: 'No bookings found for this UserId' });
        }
        return res.status(200).json(bookings);
    
    } catch (error) {
        next(error);
        
    }
}


