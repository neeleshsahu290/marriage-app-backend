
import express from "express";
import authRoutes from "./auth.routes.js";
// import userRoutes from "./user.routes.js";
// import matchRoutes from "./match.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
// router.use("/users", userRoutes);
// router.use("/matches", matchRoutes);

export default router;
