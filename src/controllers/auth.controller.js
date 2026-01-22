import { createUserService, loginService } from "../services/user.service.js";
import {
  sendEmailOtpService,
  verifyEmailOtpService,verifyPhoneOtpService,sendPhoneOtpService
} from "../services/auth.service.js";
import { success } from "../utils/success.util.js";
import { SUCCESS } from "../utils/success-status.util.js";
import { ERRORS } from "../utils/error-status.util.js";

/**
 * CREATE USER
 */
export const createUser = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    return success(res, SUCCESS.CREATED, user, "User created successfully");
  } catch (error) {
    return res.status(error.statusCode || ERRORS.INTERNAL).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

/**
 * LOGIN
 */
export const login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    return success(res, SUCCESS.OK, result, "Login successful");
  } catch (error) {
    return res.status(error.statusCode || ERRORS.INTERNAL).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

/**
 * Send Email OTP
 */
export const sendEmailOtp = async (req, res) => {
  try {
    const { email } = req.body;

    await sendEmailOtpService(email);

    return success(res, SUCCESS.OK, null, "Verification code sent to email");
  } catch (error) {
    return res.status(error.statusCode || ERRORS.INTERNAL).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

/**
 * VERIFY EMAIL OTP
 */
export const verifyEmailOtp = async (req, res) => {
  try {
    const data = await verifyEmailOtpService(req.body.email, req.body.otp);
    success(res, SUCCESS.OK, data, "Email verified successfully");
  } catch (error) {
    return res.status(error.statusCode || ERRORS.INTERNAL).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


/**
 * SEND PHONE OTP
 */
export const sendPhoneOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    await sendPhoneOtpService(phone);

    return success(
      res,
      SUCCESS.OK,
      null,
      "Verification code sent to phone"
    );
  } catch (error) {
    return res.status(error.statusCode || ERRORS.INTERNAL).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

/**
 * VERIFY PHONE OTP
 */
export const verifyPhoneOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const data = await verifyPhoneOtpService(phone, otp);

    return success(
      res,
      SUCCESS.OK,
      data,
      "Phone verified successfully"
    );
  } catch (error) {
    return res.status(error.statusCode || ERRORS.INTERNAL).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


export const me = async (req, res) => {
  // res.json(req.user);
};
