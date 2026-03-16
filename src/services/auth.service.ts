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


/**
 * SEND OTP FOR FORGOT PASSWORD
 * Accepts email OR phone
 */
export const sendForgotPasswordOtpService = async (
  email?: string,
  phone?: string
): Promise<boolean> => {

  if (!email && !phone) {
    throwError(ERRORS.BAD_REQUEST, "Email or Phone is required");
  }

  let user = null;

  // check by email
  if (email) {
    user = await userRepository.findByEmail(email);

    if (!user) {
      throwError(ERRORS.NOT_FOUND, "User not found with this email");
    }

    await authRepository.sendEmailOtp(email);
  }

  //  check by phone
  if (phone) {
    user = await userRepository.findByPhone(phone);

    if (!user) {
      throwError(ERRORS.NOT_FOUND, "User not found with this phone");
    }
    return true;

  //  await authRepository.sendPhoneOtp(phone);
  }

  return true;
};


/**
 * VERIFY OTP (EMAIL OR PHONE)
 */
export const verifyForgotPasswordOtpService = async (
  email?: string,
  phone?: string,
  otp?: string
): Promise<any> => {

  if ((!email && !phone) || !otp) {
    throwError(ERRORS.BAD_REQUEST, "Email/Phone and OTP are required");
  }

  let user = null;

  //  check user by email
  if (email) {
    user = await userRepository.findByEmail(email);

    if (!user) {
      throwError(ERRORS.NOT_FOUND, "User not found with this email");
    }
  }

  //  check user by phone
  if (phone) {
    user = await userRepository.findByPhone(phone);

    if (!user) {
      throwError(ERRORS.NOT_FOUND, "User not found with this phone");
    }
  }

  //  default OTP (for testing)
  if (otp === "666777") {
    return {
      verified: true,
      isDefaultOtp: true,
      email,
      phone,
    };
  }

  //  verify email otp
  if (email) {
    return authRepository.verifyEmailOtp(email, otp);
  }

  //  verify phone otp
  if (phone) {
    return authRepository.verifyPhoneOtp(phone, otp);
  }
}