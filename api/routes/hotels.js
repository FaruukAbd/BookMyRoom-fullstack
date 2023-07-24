import express from "express";
import Hotel from "../models/Hotel.js";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, getTopHotels, insertPhoto, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router=express.Router();

//create
router.post("/", verifyAdmin, createHotel)
//update
router.put("/:id",verifyAdmin,updateHotel)
//insertphoto
router.post("/insert/:id",verifyAdmin,insertPhoto)
//delete
router.delete("/:id",verifyAdmin,deleteHotel)
//get 
router.get("/find/:id",getHotel)
//get all
router.get("/",getHotels) 
router.get("/countByCity",countByCity);
router.get("/countByType",countByType);
router.get("/getTopHotels",getTopHotels);
router.get("/room/:id",getHotelRooms);


export default router;