import express from "express";
import {createUser,login,me,sendEmailOtp,verifyEmailOtp,  sendPhoneOtp,
  verifyPhoneOtp,
 } from "../controllers/auth.controller.js";
// import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

//Auth

router.post("/send-email-otp", sendEmailOtp);
router.post("/verify-email-otp", verifyEmailOtp);

router.post("/send-phone-otp", sendPhoneOtp);
router.post("/verify-phone-otp", verifyPhoneOtp);


router.post("/users", createUser);
router.post("/login", login);
router.get("/me", me);




export default router;
