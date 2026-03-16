import { Request, Response, NextFunction } from "express";

import {
  createSubscriptionService,
  checkSubscriptionService,
  cancelSubscriptionService,
} from "../services/subscription.service";

import { success } from "../utils/success.util";
import { SUCCESS } from "../utils/success-status.util";

/**
 * CREATE SUBSCRIPTION
 */
export const createSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id = req.user!.user_id;
    const { plan, payment_id } = req.body as {
      plan: string;
      payment_id?: string;
    };

    const data = await createSubscriptionService(user_id, plan, payment_id);

    return success(
      res,
      SUCCESS.CREATED,
      data,
      "Subscription created successfully",
    );
  } catch (error) {
    next(error);
  }
};

/**
 * CHECK SUBSCRIPTION
 */
export const checkSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id = req.user!.user_id;

    const data = await checkSubscriptionService(user_id);

    return success(res, SUCCESS.OK, data, "Subscription status fetched");
  } catch (error) {
    next(error);
  }
};

/**
 * CANCEL SUBSCRIPTION
 */
export const cancelSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id = req.user!.user_id;

    const data = await cancelSubscriptionService(user_id);

    return success(res, SUCCESS.OK, data, "Subscription cancelled");
  } catch (error) {
    next(error);
  }
};

/**
 * MY SUBSCRIPTION
 */
export const mySubscription = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id = req.user!.user_id;

    const data = await checkSubscriptionService(user_id);

    return success(res, SUCCESS.OK, data, "Subscription fetched");
  } catch (error) {
    next(error);
  }
};
