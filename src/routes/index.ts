
import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
 import matchRoutes from "./match.routes";
 import chatRoutes from "./chat.routes";
import subscriptionRoutes from "./subscription.routes";

const router = express.Router();

router.use("/auth", authRoutes);
 router.use("/users", userRoutes);
 router.use("/matches", matchRoutes);
 router.use("/chats", chatRoutes);
 router.use("/subscription", subscriptionRoutes);

export default router;
