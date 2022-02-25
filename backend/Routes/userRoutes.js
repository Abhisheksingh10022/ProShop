import express from "express";

const router=express.Router();
import AuthUser from "../controllers/userController.js"


router.post('/login',AuthUser);


export default router;