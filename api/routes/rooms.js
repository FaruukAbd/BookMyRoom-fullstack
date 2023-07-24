import express from 'express';
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailabilty, updateRoomAvailabiltyonCancel } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';


const router=express.Router();
//create
router.post("/:hotelid",verifyAdmin,createRoom)
//update
router.put("/:id",verifyAdmin,updateRoom)
//updateAviability
router.put("/availability/:id", updateRoomAvailabilty)
router.put("/availabilityoncalcel/:id", updateRoomAvailabiltyonCancel)
//delete
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom);

//get
router.get("/:id",getRoom);

//get all User
router.get("/",getRooms);


export default router

