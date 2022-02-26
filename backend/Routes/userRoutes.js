import express from "express";

const router=express.Router();
import {AuthUser ,getUserProfile}from "../controllers/userController.js"
import protect from "../Middlewares/authMiddleware.js"

router.post('/login',AuthUser);
router.route('/profile').get(protect,getUserProfile);
export default router;