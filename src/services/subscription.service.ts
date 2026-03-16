import { DeepPartial } from "typeorm";
import { AdminDataSource } from "../config/admin.datasoure";

import { Subscription, SubscriptionPlan, SubscriptionStatus } from "../entity/Subscription";
import { User } from "../entity/User";


import { throwError } from "../utils/error.util";
import { ERRORS } from "../utils/error-status.util";
import { subscriptionPlans } from "../config/subscriprtion.plans";


const subscriptionRepository =
  AdminDataSource.getRepository(Subscription);

const userRepository =
  AdminDataSource.getRepository(User);



/* =========================================
   CREATE SUBSCRIPTION
========================================= */
export const createSubscriptionService = async (
  user_id: string,
  plan: string,
  payment_id?: string
) => {

  // validate plan
  if (!(plan in subscriptionPlans)) {
    throwError(
      ERRORS.BAD_REQUEST,
      "Invalid plan"
    );
  }

  const planKey =
    plan as SubscriptionPlan;

  const planData =
    subscriptionPlans[planKey];

  const user =
    await userRepository.findOne({
      where: { id: user_id },
    });

  if (!user) {
    throwError(
      ERRORS.NOT_FOUND,
      "User not found"
    );
  }

  const start = new Date();

  const expire = new Date(
    start.getTime() +
      planData.days *
        24 *
        60 *
        60 *
        1000
  );

  const sub =
    subscriptionRepository.create({
      user_id,
      plan: planKey,
      price: planData.price,
      payment_id,
      status:
        SubscriptionStatus.ACTIVE,
      start_date: start,
      expire_date: expire,
    });

  await subscriptionRepository.save(sub);

  user!.subscription_active = true;
  user!.subscription_plan = planKey;
  user!.subscription_expire = expire;

  await userRepository.save(user!);

  return sub;
};


/* =========================================
   CHECK SUBSCRIPTION
========================================= */

export const checkSubscriptionService =
  async (user_id: string) => {

    const user =
      await userRepository.findOne({
        where: { id: user_id },
      });

    if (!user) {
      throwError(
        ERRORS.NOT_FOUND,
        "User not found"
      );
    }

    if (
      user!.subscription_expire &&
      user!.subscription_expire >
        new Date()
    ) {
      return {
        active: true,
        plan:
          user!.subscription_plan,
        expire:
          user!.subscription_expire,
      };
    }

    return {
      active: false,
    };
  };



/* =========================================
   CANCEL
========================================= */

export const cancelSubscriptionService =
  async (user_id: string) => {

    const user =
      await userRepository.findOne({
        where: { id: user_id },
      });

    if (!user) {
      throwError(
        ERRORS.NOT_FOUND,
        "User not found"
      );
    }

    user!.subscription_active = false;
    user!.subscription_plan = null;
    user!.subscription_expire = null;

    await userRepository.save(user!);

    await subscriptionRepository.update(
      { user_id },
      {
        status:
          SubscriptionStatus.CANCELLED,
      }
    );

    return true;
  };



/* =========================================
   EXPIRE CHECK
========================================= */

export const expireSubscriptionsService =
  async () => {

    const now = new Date();

    const subs =
      await subscriptionRepository.find({
        where: {
          status:
            SubscriptionStatus.ACTIVE,
        },
      });

    for (const s of subs) {

      if (s.expire_date < now) {

        s.status =
          SubscriptionStatus.EXPIRED;

        await subscriptionRepository.save(
          s
        );

        const user =
          await userRepository.findOne(
            {
              where: {
                id: s.user_id,
              },
            }
          );

        if (user) {

          user.subscription_active =
            false;

          user.subscription_plan = null;

          user.subscription_expire = null;

          await userRepository.save(
            user
          );
        }
      }
    }
  };