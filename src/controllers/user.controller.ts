import { NextFunction, Request, Response } from "express"; ////
import { UserProfile } from "../entity/UserProfile";
import { success } from "../utils/success.util";
import { SUCCESS } from "../utils/success-status.util";
import { ERRORS } from "../utils/error-status.util";
import { AdminDataSource } from "../config/admin.datasoure";
import {
  getAllProfilesService,
  upsertUserProfile,
  updateSingleUserFieldService,
  updateMultipleUserFieldsService,
  upsertUserPreferences,
} from "../services/user.service";
//import { SUCCESS, ERRORS } from "../constants/statusCodes";
//import { success } from "../utils/responseHandler";

export const upsertProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id = req.user!.user_id;
//console.log("req.body", req.body);
 const { user_profile, preferences } = req.body;

    if (!user_profile) {
      throw new Error("user_profile is required");
    }

    const profileData = await upsertUserProfile({
      user_id,
      ...user_profile,
    });

    let prefData = null;

    if (preferences  && Object.keys(preferences).length) {
      prefData = await upsertUserPreferences({
        user_id,
        ...preferences,
      });
    }
    return success(
      res,
      SUCCESS.OK,
      {
        profile: profileData,
        preferences: prefData,
      },
      "Profile created or updated successfully",
    );
  } catch (error: any) {
    console.error("Error in upsertProfile:", error);
    next(error);
  }
};


export const upsertPreferencesOnly = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id = req.user!.user_id;

    

    const prefData = await upsertUserPreferences({
      user_id,
      ...req.body,
    });

    return success(
      res,
      SUCCESS.OK,
      
      prefData,
      
      "Preferences updated successfully",
    );
  } catch (error: any) {
    console.error("Error in upsertPreferencesOnly:", error);
    next(error);
  }
};


export const getAllProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profiles = await getAllProfilesService();

    return success(res, SUCCESS.OK, profiles, "Profiles fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const updateUserField = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id = req.user!.user_id;

    const { field, value } = req.body;

    const result = await updateSingleUserFieldService({
      user_id,
      field,
      value,
    });
    return success(
      res,
      SUCCESS.OK,
      result,
      `${result.field} updated successfully`,
    );
  } catch (error) {
    next(error);
  }
};

export const updateUserFields = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const user_id = req.user!.user_id;

    const result = await updateMultipleUserFieldsService({
      user_id: user_id,
      fields: req.body,
    });
    return success(res, SUCCESS.OK, result, `Settings updated successfully`);
  } catch (error) {
    next(error);
  }
};
