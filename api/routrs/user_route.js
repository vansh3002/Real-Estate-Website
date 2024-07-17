import express from "express"
import { test } from "../Controllers/user_controller.js";
import { updateUser } from "../Controllers/user_controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { deleteUser , getUser } from "../Controllers/user_controller.js";
import { getUserListings } from "../Controllers/user_controller.js";
const router=express.Router();
router.get('/test',test);
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/listings/:id',verifyToken,getUserListings)
router.get('/:id',verifyToken,getUser)
export default router;