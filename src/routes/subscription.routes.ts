import express from "express";

import {
  createSubscription,
  checkSubscription,
  cancelSubscription,
  mySubscription,
} from "../controllers/subscription.controller";

const router = express.Router();


// Subscription

router.post("/create-subscription", createSubscription);

router.get("/check-subscription", checkSubscription);

router.post("/cancel-subscription", cancelSubscription);

router.get("/my-subscription", mySubscription);


export default router;