import express from "express";

const router=express.Router();
import {AuthUser ,getUserProfile,registerUser, updateUserProfile}from "../controllers/userController.js"
import protect from "../Middlewares/authMiddleware.js"

router.post('/login',AuthUser);
router.route('/').post(registerUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
export default router;