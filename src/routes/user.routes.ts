import express from "express";
import {getAllProfiles, upsertProfile,updateUserField,updateUserFields, upsertPreferencesOnly
 } from "../controllers/user.controller"
 import{ authMiddleware} from "../middleware/auth.middleware";

const router = express.Router();

//Auth

router.post("/profile",authMiddleware ,upsertProfile);
router.post("/preferences",authMiddleware ,upsertPreferencesOnly);


router.get("/all-profiles", getAllProfiles);

router.put("/update-field", authMiddleware, updateUserField);

router.put("/update-fields", authMiddleware, updateUserFields);

export default router;

