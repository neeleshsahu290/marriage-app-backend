import { Request, Response, NextFunction } from "express";

import { createUserService, createUsersWithProfilesBulkService, loginService } from "../services/user.service";
import {
  sendEmailOtpService,
  verifyEmailOtpService,
  verifyPhoneOtpService,
  sendPhoneOtpService,
} from "../services/auth.service";

import { success } from "../utils/success.util";
import { SUCCESS } from "../utils/success-status.util";

/**
 * CREATE USER
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUserService(req.body);

    return success(
      res,
      SUCCESS.CREATED,
      user,
      "User created successfully"
    );

  } catch (error) {
    next(error);
  }
};

/**
 * LOGIN
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await loginService(req.body);

    return success(
      res,
      SUCCESS.OK,
      result,
      "Login successful"
    );

  } catch (error) {
    next(error);
  }
};

/**
 * SEND EMAIL OTP
 */
export const sendEmailOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body as { email: string };

    await sendEmailOtpService(email);

    return success(
      res,
      SUCCESS.OK,
      null,
      "Verification code sent to email"
    );

  } catch (error) {
    next(error);
  }
};

/**
 * VERIFY EMAIL OTP
 */
export const verifyEmailOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body as {
      email: string;
      otp: string;
    };

    const data = await verifyEmailOtpService(email, otp);

    return success(
      res,
      SUCCESS.OK,
      data,
      "Email verified successfully"
    );

  } catch (error) {
    next(error);
  }
};

/**
 * SEND PHONE OTP
 */
export const sendPhoneOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone } = req.body as { phone: string };

    await sendPhoneOtpService(phone);

    return success(
      res,
      SUCCESS.OK,
      null,
      "Verification code sent to phone"
    );

  } catch (error) {
    next(error);
  }
};

/**
 * VERIFY PHONE OTP
 */
export const verifyPhoneOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone, otp } = req.body as {
      phone: string;
      otp: string;
    };

    const data = await verifyPhoneOtpService(phone, otp);

    return success(
      res,
      SUCCESS.OK,
      data,
      "Phone verified successfully"
    );

  } catch (error) {
    console.log(error)
    next(error);
  }
};

/**
 * ME
 */
export const me = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Example:
    // return success(res, SUCCESS.OK, req.user, "User fetched");

    return success(res, SUCCESS.OK, null, "User fetched");

  } catch (error) {
    next(error);
  }
};




/**
 * CREATE BULK USER
 */
export const createBulkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUsersWithProfilesBulkService(req.body);

    return success(
      res,
      SUCCESS.CREATED,
      user,
      "User created successfully"
    );

  } catch (error) {
    next(error);
  }
};