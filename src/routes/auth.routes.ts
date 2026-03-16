import express from "express";
import {createUser,login,me,sendEmailOtp,verifyEmailOtp,  sendPhoneOtp,
  verifyPhoneOtp,
  createBulkUser,
  sendForgotPasswordOtp,
  verifyForgotPasswordOtp,
  changePassword,
 } from "../controllers/auth.controller";

const router = express.Router();

//Auth

router.post("/send-email-otp", sendEmailOtp);
router.post("/verify-email-otp", verifyEmailOtp);

router.post("/send-phone-otp", sendPhoneOtp);
router.post("/verify-phone-otp", verifyPhoneOtp);

router.post("/send-forgot-otp", sendForgotPasswordOtp);
router.post("/verify-forgot-otp", verifyForgotPasswordOtp);


router.post("/users", createUser);
router.post("/login", login);
router.get("/me", me);

router.post("/create-bulk-users", createBulkUser);

router.post("/change-password", changePassword);



export default router;
