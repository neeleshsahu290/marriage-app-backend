import express from "express";
import {createOrUpdateProfile
 } from "../controllers/user.controller"
// import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

//Auth

router.post("/send-email-otp", createOrUpdateProfile)
router.post("/verify-email-otp", verifyEmailOtp);

router.post("/send-phone-otp", sendPhoneOtp);
router.post("/verify-phone-otp", verifyPhoneOtp);


router.post("/users", createUser);
router.post("/login", login);
router.get("/me", me);




export default router;

