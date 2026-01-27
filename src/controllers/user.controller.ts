import { NextFunction, Request, Response } from "express";////
import { UserProfile } from "../entity/UserProfile";
import { success } from "../utils/success.util";
import { SUCCESS } from "../utils/success-status.util";
import { ERRORS } from "../utils/error-status.util";
import { AdminDataSource } from "../config/admin.datasoure";
//import { SUCCESS, ERRORS } from "../constants/statusCodes";
//import { success } from "../utils/responseHandler";

const userProfileRepository = AdminDataSource.getRepository(UserProfile);

export default class UserController {

  public static async createProfile(req: Request, res: Response, next:NextFunction) {
    try {

      const profile = userProfileRepository.create(req.body);
      const data = await userProfileRepository.save(profile);

      return success(
        res,
        SUCCESS.OK,
        data,
        "Profile created successfully"
      );

    } catch (error: any) {

    next(error)

    }
  }

}
