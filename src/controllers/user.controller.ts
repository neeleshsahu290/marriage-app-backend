import { NextFunction, Request, Response } from "express";////
import { UserProfile } from "../entity/UserProfile";
import { success } from "../utils/success.util";
import { SUCCESS } from "../utils/success-status.util";
import { ERRORS } from "../utils/error-status.util";
import { AdminDataSource } from "../config/admin.datasoure";
//import { SUCCESS, ERRORS } from "../constants/statusCodes";
//import { success } from "../utils/responseHandler";

// controllers/user.controller.ts
import { upsertUserProfile } from "../services/user.service.js";

export const createOrUpdateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await upsertUserProfile(req.body);

    return success(
      res,
      SUCCESS.OK,
      result,
      "Profile created or updated successfully"
    );
  } catch (error) {
    next(error);
  }
};
