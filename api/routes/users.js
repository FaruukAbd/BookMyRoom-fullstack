import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router=express.Router();

// router.get("/checkautentication",verifyToken,(req,res,next)=>{
//     res.send("hello users you are authenticated")
// })

//update
router.put("/:id",updateUser)
//delete
router.delete("/:id",verifyUser,deleteUser);

//get
router.get("/:id",getUser);

//get all User
router.get("/",verifyAdmin,getUsers);


export default router;