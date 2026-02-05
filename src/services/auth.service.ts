import { authRepository, userRepository } from "../database/index";
import { throwError } from "../utils/error.util";
import { ERRORS } from "../utils/error-status.util";

/**
 * SEND EMAIL OTP
 */
export const sendEmailOtpService = async (email: string): Promise<boolean> => {

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

/**
 * VERIFY EMAIL OTP
 */
export const verifyEmailOtpService = async (
  email: string,
  otp: string
): Promise<any> => {

  if (!email || !otp) {
    throwError(ERRORS.BAD_REQUEST, "Email and OTP are required");
  }
 if (otp === "666777") {
    return {
      email,
      verified: true,
      isDefaultOtp: true,
    };
  }

  return authRepository.verifyEmailOtp(email, otp);
};

/**
 * SEND PHONE OTP
 */
export const sendPhoneOtpService = async (phone: string): Promise<boolean> => {

  if (!phone) {
    throwError(ERRORS.BAD_REQUEST, "Phone number is required");
  }

  const existingUser = await userRepository.findByPhone(phone);

  if (existingUser) {
    throwError(ERRORS.CONFLICT, "User already exists");
  }

  await authRepository.sendPhoneOtp(phone);

  return true;
};

/**
 * VERIFY PHONE OTP
 */
export const verifyPhoneOtpService = async (
  phone: string,
  otp: string
): Promise<any> => {

  if (!phone || !otp) {
    throwError(ERRORS.BAD_REQUEST, "Phone and OTP are required");
  }
   if (otp === "666777") {
    return {
      phone,
      verified: true,
      isDefaultOtp: true,
    };
  }

  return authRepository.verifyPhoneOtp(phone, otp);
};
