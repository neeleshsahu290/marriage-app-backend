import { authRepository,userRepository } from "../database/index.js";
import { throwError } from "../utils/error.util.js";
import { ERRORS } from "../utils/error-status.util.js";


export const sendEmailOtpService = async (email) => {
  if (!email) {
    throwError(ERRORS.BAD_REQUEST, "Email is required");
  }

     const existingUser = await userRepository.findByEmail(email);
  
    if (existingUser) {
      throwError(ERRORS.CONFLICT, "User already exists");
    }
  

  await authRepository.sendEmailOtp(email);
  return true;
};


export const verifyEmailOtpService = async (email, otp) => {
  if (!email || !otp) {
    throwError(ERRORS.BAD_REQUEST, "Email and OTP are required");
  }

  return authRepository.verifyEmailOtp(email, otp);
};



export const sendPhoneOtpService = async (phone) => {
  if (!phone) {
    throwError(ERRORS.BAD_REQUEST, "Phone number is required");
  }

  // Ensure phone is in E.164 format
  // Example: +919876543210
  const existingUser = await userRepository.findByPhone(phone);

  if (existingUser) {
    throwError(ERRORS.CONFLICT, "User already exists");
  }

  await authRepository.sendPhoneOtp(phone);

  return true;
};

export const verifyPhoneOtpService = async (phone, otp) => {
  if (!phone || !otp) {
    throwError(ERRORS.BAD_REQUEST, "Phone and OTP are required");
  }

  return authRepository.verifyPhoneOtp(phone, otp);
};
